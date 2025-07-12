import mockData from "@/services/mockData/shortLinks.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate random short code
const generateShortCode = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// In-memory storage (in real app, this would be a database)
let shortLinks = [...mockData];

export const getAllShortLinks = async () => {
  await delay(300);
  return [...shortLinks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getShortLinkById = async (id) => {
  await delay(200);
  const link = shortLinks.find(link => link.Id === parseInt(id));
  if (!link) {
    throw new Error("Short link not found");
  }
  return { ...link };
};

export const shortenURL = async (originalUrl, customAlias = null) => {
  await delay(400);
  
  // Check if custom alias already exists
  if (customAlias) {
    const existingAlias = shortLinks.find(link => 
      link.customAlias === customAlias || link.shortCode === customAlias
    );
    if (existingAlias) {
      throw new Error("Custom alias already exists. Please choose a different one.");
    }
  }
  
  // Create new short link
  const newId = Math.max(...shortLinks.map(link => link.Id), 0) + 1;
  const shortCode = customAlias || generateShortCode();
  
  const newLink = {
    Id: newId,
    originalUrl,
    shortCode,
    customAlias,
    clicks: 0,
    createdAt: new Date().toISOString(),
    qrCode: ""
  };
  
  shortLinks.push(newLink);
  return { ...newLink };
};

export const incrementClicks = async (id) => {
  await delay(200);
  const linkIndex = shortLinks.findIndex(link => link.Id === parseInt(id));
  if (linkIndex === -1) {
    throw new Error("Short link not found");
  }
  
  shortLinks[linkIndex].clicks += 1;
  return { ...shortLinks[linkIndex] };
};

export const deleteShortLink = async (id) => {
  await delay(300);
  const linkIndex = shortLinks.findIndex(link => link.Id === parseInt(id));
  if (linkIndex === -1) {
    throw new Error("Short link not found");
  }
  
  shortLinks.splice(linkIndex, 1);
  return true;
};

export const updateShortLink = async (id, data) => {
  await delay(300);
  const linkIndex = shortLinks.findIndex(link => link.Id === parseInt(id));
  if (linkIndex === -1) {
    throw new Error("Short link not found");
  }
  
  // Check if custom alias already exists (if being updated)
  if (data.customAlias) {
    const existingAlias = shortLinks.find(link => 
      link.Id !== parseInt(id) && 
      (link.customAlias === data.customAlias || link.shortCode === data.customAlias)
    );
    if (existingAlias) {
      throw new Error("Custom alias already exists. Please choose a different one.");
    }
  }
  
  shortLinks[linkIndex] = { ...shortLinks[linkIndex], ...data };
  return { ...shortLinks[linkIndex] };
};