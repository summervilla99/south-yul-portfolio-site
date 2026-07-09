import { photoSections } from "./portfolio-data";

function buildFolderPrefix(folder) {
  const baseFolder = (process.env.CLOUDINARY_PHOTOS_BASE_FOLDER || "").trim().replace(/^\/|\/$/g, "");
  const cleanFolder = folder.replace(/^\/|\/$/g, "");

  return baseFolder ? `${baseFolder}/${cleanFolder}/` : `${cleanFolder}/`;
}

function formatTitleFromPublicId(publicId) {
  const filename = publicId.split("/").pop() || publicId;
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function requestCloudinaryJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Cloudinary request failed: ${response.status}`);
  }

  return response.json();
}

function mapResource(resource, index) {
  return {
    title: resource.display_name || formatTitleFromPublicId(resource.public_id),
    src: resource.secure_url,
    publicId: resource.public_id,
    width: resource.width,
    height: resource.height,
    order: index,
  };
}

async function searchFolderAssets(folder, auth, cloudName) {
  const endpoint = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`);
  const data = await requestCloudinaryJson(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expression: `asset_folder="${folder}" AND resource_type="image"`,
      max_results: 100,
      sort_by: [{ created_at: "desc" }],
    }),
    next: { revalidate: 60 },
  });

  return Array.isArray(data.resources) ? data.resources : [];
}

async function fetchFolderAssets(folder) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return [];
  }

  const prefix = buildFolderPrefix(folder);
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const byAssetFolder = await searchFolderAssets(folder, auth, cloudName);
  if (byAssetFolder.length > 0) {
    return byAssetFolder
      .filter((resource) => resource.secure_url)
      .map((resource, index) => mapResource(resource, index));
  }

  const endpoint = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`);
  endpoint.searchParams.set("prefix", prefix);
  endpoint.searchParams.set("max_results", "100");
  endpoint.searchParams.set("type", "upload");

  const data = await requestCloudinaryJson(endpoint, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    next: { revalidate: 60 },
  });
  const resources = Array.isArray(data.resources) ? data.resources : [];

  return resources
    .filter((resource) => resource.secure_url)
    .map((resource, index) => mapResource(resource, index));
}

export async function getResolvedPhotoSections() {
  const sections = await Promise.all(
    photoSections.map(async (section) => {
      try {
        const cloudinaryPhotos = await fetchFolderAssets(section.folder);

        if (cloudinaryPhotos.length > 0) {
          if (section.photos.some((photo) => photo.src?.startsWith("/photos/"))) {
            return section;
          }

          return {
            ...section,
            photos: cloudinaryPhotos,
          };
        }
      } catch (error) {
        console.error(error);
      }

      return section;
    })
  );

  return sections;
}
