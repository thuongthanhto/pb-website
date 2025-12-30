# 🎨 Custom Metadata System Guide

Your photography website now supports comprehensive custom metadata for both images and SEO!

## 📋 Table of Contents
- [Image Metadata](#image-metadata)
- [SEO Metadata](#seo-metadata)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Examples](#examples)

---

## 🖼️ Image Metadata

### What Can You Customize?

For each image, you can add:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Custom title for the image | "Golden Hour Wedding" |
| `description` | string | Detailed description | "Beautiful sunset wedding ceremony" |
| `photographer` | string | Photographer's name | "Phat Bo" |
| `tags` | array | Keywords/categories | ["wedding", "sunset", "outdoor"] |
| `location` | string | Where the photo was taken | "Vung Tau Beach" |
| `date` | string | Date of the photo | "2024-03-15" |
| `camera` | string | Camera used | "Sony A7III" |
| `lens` | string | Lens used | "Sony FE 85mm f/1.4 GM" |
| `settings` | object | Camera settings | See below |
| `featured` | boolean | Mark as featured | true/false |
| `order` | number | Display order | 1, 2, 3... |

### Camera Settings Object

```json
"settings": {
  "iso": "400",
  "aperture": "f/1.8",
  "shutterSpeed": "1/200s",
  "focalLength": "85mm"
}
```

---

## 📂 Setup Instructions

### Step 1: Create metadata.json

Create a file named `metadata.json` and upload it to your R2 bucket at:
```
photos/metadata.json
```

### Step 2: Add Your Image Metadata

Use this structure:

```json
{
  "photos/studio/image1.jpg": {
    "key": "photos/studio/image1.jpg",
    "title": "Classic Portrait",
    "description": "Professional studio portrait with dramatic lighting",
    "photographer": "Phat Bo",
    "tags": ["portrait", "studio", "professional"],
    "location": "PB Studio, Ho Chi Minh City",
    "date": "2024-01-15",
    "camera": "Sony A7III",
    "lens": "Sony FE 85mm f/1.4 GM",
    "settings": {
      "iso": "400",
      "aperture": "f/1.8",
      "shutterSpeed": "1/200s",
      "focalLength": "85mm"
    },
    "featured": true,
    "order": 1
  },
  "photos/outdoor/image2.jpg": {
    "key": "photos/outdoor/image2.jpg",
    "title": "Beach Wedding Sunset",
    "description": "Romantic wedding photo during golden hour",
    "photographer": "Phat Bo",
    "tags": ["wedding", "outdoor", "sunset", "beach"],
    "location": "Vung Tau Beach",
    "date": "2024-02-20",
    "featured": true,
    "order": 2
  }
}
```

### Step 3: Upload to R2

Using your R2 management tool, upload the `metadata.json` file to:
```
ten-g-storage/photos/metadata.json
```

### Step 4: Rebuild Your Site

```bash
npm run build
# or
vercel deploy
```

---

## ✨ Features

### 1. **Image Viewer Enhancements**

When viewing an image, users can:
- Click the **ℹ️ Info button** to see all metadata
- View photographer name, location, date
- See camera and lens information
- Check camera settings (ISO, aperture, shutter speed)
- Browse tags

### 2. **Automatic Sorting**

Images are automatically sorted by:
1. Custom `order` field (if provided)
2. Filename (alphabetically)

### 3. **Enhanced SEO**

The system automatically generates:
- Dynamic page titles with image counts
- Rich descriptions with folder names
- Open Graph metadata for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for Google

### 4. **Display Customization**

- Images with custom titles show the title instead of filename
- Featured images can be highlighted (future feature)
- Tags help with categorization and filtering (future feature)

---

## 🎯 Examples

### Example 1: Wedding Photo

```json
"photos/T&K/ceremony-001.jpg": {
  "key": "photos/T&K/ceremony-001.jpg",
  "title": "T&K Wedding - First Kiss",
  "description": "Beautiful moment as T&K share their first kiss as husband and wife",
  "photographer": "Phat Bo",
  "tags": ["wedding", "ceremony", "T&K", "emotional", "kiss"],
  "location": "Rex Hotel, District 1, HCMC",
  "date": "2024-03-10",
  "camera": "Canon EOS R5",
  "lens": "Canon RF 70-200mm f/2.8",
  "settings": {
    "iso": "800",
    "aperture": "f/2.8",
    "shutterSpeed": "1/250s",
    "focalLength": "135mm"
  },
  "featured": true,
  "order": 1
}
```

### Example 2: Studio Portrait

```json
"photos/studio/portrait-professional.jpg": {
  "key": "photos/studio/portrait-professional.jpg",
  "title": "Executive Business Portrait",
  "description": "Professional headshot with clean studio lighting",
  "photographer": "Phat Bo",
  "tags": ["portrait", "business", "professional", "headshot", "studio"],
  "location": "PB Studio",
  "date": "2024-04-15",
  "camera": "Sony A7III",
  "lens": "Sony FE 85mm f/1.4 GM",
  "settings": {
    "iso": "100",
    "aperture": "f/2.0",
    "shutterSpeed": "1/160s",
    "focalLength": "85mm"
  },
  "order": 5
}
```

### Example 3: Outdoor/Nature

```json
"photos/outdoor/landscape-sunset.jpg": {
  "key": "photos/outdoor/landscape-sunset.jpg",
  "title": "Mekong Delta Sunset",
  "description": "Stunning sunset over the Mekong River delta",
  "photographer": "Phat Bo",
  "tags": ["landscape", "sunset", "mekong", "nature", "outdoor"],
  "location": "Mekong Delta, Vietnam",
  "date": "2024-05-01",
  "camera": "Nikon Z9",
  "lens": "Nikkor Z 24-70mm f/2.8",
  "settings": {
    "iso": "200",
    "aperture": "f/8",
    "shutterSpeed": "1/500s",
    "focalLength": "35mm"
  },
  "featured": true,
  "order": 3
}
```

---

## 🚀 SEO Metadata

### Automatic Features

The system automatically generates SEO metadata including:

#### 1. **Dynamic Page Titles**
```
Album & Portfolio | PB Studio - Nhiếp Ảnh Chuyên Nghiệp
```

#### 2. **Rich Descriptions**
```
Xem bộ sưu tập 150 ảnh chuyên nghiệp của chúng tôi.
Bao gồm studio, outdoor, T&K, V&K.
Từ tiệc cưới, chân dung, sự kiện đến thương mại.
```

#### 3. **Smart Keywords**
Automatically includes:
- All folder names
- Common photography terms
- Vietnamese keywords

#### 4. **Open Graph Tags**
Perfect for Facebook, LinkedIn sharing:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
```

#### 5. **Structured Data (JSON-LD)**
Helps Google understand your images:
```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "PB Studio Photo Gallery",
  "image": [...]
}
```

---

## 💡 Tips & Best Practices

### 1. **Title Writing**
- Keep titles concise (3-8 words)
- Be descriptive but not verbose
- Include emotion or mood when relevant

### 2. **Descriptions**
- Write 1-2 sentences
- Explain the story or context
- Include relevant details

### 3. **Tags**
- Use 3-7 tags per image
- Be specific and relevant
- Use consistent tag names
- Include both Vietnamese and English if needed

### 4. **Order Numbers**
- Start from 1 for featured/important images
- Leave gaps (1, 5, 10, 15...) for easy reordering
- Group related images with similar numbers

### 5. **Photographer Field**
- Use consistent name format
- Include team member names for collaboration

---

## 🔧 Advanced Usage

### Bulk Metadata Generation

For large collections, you can generate metadata programmatically:

```javascript
const images = [/* your image list */];
const metadata = {};

images.forEach((img, index) => {
  metadata[img.path] = {
    key: img.path,
    title: extractTitleFromFilename(img.name),
    photographer: "Phat Bo",
    order: index + 1,
  };
});

console.log(JSON.stringify(metadata, null, 2));
```

### Partial Metadata

You don't need to fill all fields! Only add what's relevant:

```json
"photos/studio/quick-shot.jpg": {
  "key": "photos/studio/quick-shot.jpg",
  "title": "Quick Studio Test",
  "photographer": "Phat Bo"
}
```

### Featured Images

Mark special images as featured for future filtering:

```json
{
  "featured": true
}
```

---

## 🐛 Troubleshooting

### Metadata Not Showing?

1. **Check file path**: Ensure `metadata.json` is at `photos/metadata.json`
2. **Verify JSON syntax**: Use a JSON validator
3. **Check keys match**: Image keys in metadata must match exact file paths
4. **Rebuild site**: Run `npm run build` to fetch latest metadata
5. **Check R2 permissions**: Ensure the file is readable

### Images Out of Order?

- Add `order` field to each image in metadata
- Lower numbers appear first
- Images without `order` are sorted alphabetically

### SEO Not Working?

- Clear browser cache
- Check Vercel deployment logs
- Verify environment variables are set
- Use Google Search Console to test

---

## 📝 Quick Reference

### Minimal Metadata Entry
```json
"photos/folder/image.jpg": {
  "key": "photos/folder/image.jpg",
  "title": "My Photo Title"
}
```

### Full Metadata Entry
```json
"photos/folder/image.jpg": {
  "key": "photos/folder/image.jpg",
  "title": "Complete Photo Title",
  "description": "Full description here",
  "photographer": "Photographer Name",
  "tags": ["tag1", "tag2", "tag3"],
  "location": "Location Name",
  "date": "2024-03-15",
  "camera": "Camera Model",
  "lens": "Lens Model",
  "settings": {
    "iso": "400",
    "aperture": "f/2.8",
    "shutterSpeed": "1/200s",
    "focalLength": "85mm"
  },
  "featured": true,
  "order": 1
}
```

---

## 🎉 Benefits

✅ **Better User Experience**: Show rich information about your photos
✅ **Improved SEO**: Better search engine rankings with structured data
✅ **Social Sharing**: Beautiful preview cards on Facebook, Twitter
✅ **Professional Presentation**: Detailed technical info for photography enthusiasts
✅ **Easy Management**: Simple JSON file, no database needed
✅ **Flexible**: Add only the fields you need
✅ **Future-Proof**: Easy to extend with new fields

---

Need help? Check the example file `metadata-example.json` in your project root!

