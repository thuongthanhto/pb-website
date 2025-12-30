# 🚀 Custom Metadata - Quick Start

## ✅ What's Been Implemented

Your website now has a **complete custom metadata system** for both images and SEO!

### Features Added:

#### 1. **Image Metadata System** 📸
- Add custom titles, descriptions, and photographer info
- Store camera and lens details
- Include camera settings (ISO, aperture, shutter speed, focal length)
- Add tags for categorization
- Set location and date information
- Mark featured images
- Control display order

#### 2. **Enhanced Image Viewer** 🖼️
- Info button (ℹ️) to toggle metadata display
- Beautiful sidebar showing all image details
- Camera equipment and settings display
- Tags with hashtags
- Location and date info with icons
- Smooth animations

#### 3. **Advanced SEO** 🔍
- Dynamic page titles with image counts
- Rich meta descriptions
- Automatic keyword generation
- Open Graph tags for social sharing
- Twitter Card metadata
- Google Structured Data (JSON-LD)
- Image Gallery schema for better search visibility

---

## 🎯 How to Use (3 Simple Steps)

### Step 1: Create `metadata.json`

Create a file with this content:

```json
{
  "photos/studio/your-image.jpg": {
    "key": "photos/studio/your-image.jpg",
    "title": "Beautiful Portrait",
    "description": "Professional studio portrait session",
    "photographer": "Phat Bo",
    "tags": ["portrait", "studio", "professional"],
    "location": "PB Studio, HCMC",
    "date": "2024-03-15",
    "camera": "Sony A7III",
    "lens": "Sony FE 85mm f/1.4",
    "settings": {
      "iso": "400",
      "aperture": "f/1.8",
      "shutterSpeed": "1/200s",
      "focalLength": "85mm"
    },
    "featured": true,
    "order": 1
  }
}
```

### Step 2: Upload to R2

Upload `metadata.json` to your R2 bucket at:
```
ten-g-storage/photos/metadata.json
```

### Step 3: Deploy

```bash
npm run build
# or
vercel deploy
```

That's it! 🎉

---

## 📁 Files Created

1. **`src/lib/metadata.ts`** - Core metadata loading and enrichment
2. **`src/lib/seo-metadata.ts`** - SEO and structured data generation
3. **`metadata-example.json`** - Example metadata file with 4 sample images
4. **`METADATA_GUIDE.md`** - Complete documentation (READ THIS!)

## 📝 Files Modified

1. **`src/lib/r2-albums.ts`** - Now loads and merges metadata with images
2. **`src/features/albums/components/ImageViewer.jsx`** - Enhanced with metadata display
3. **`src/app/albums/page.js`** - Added dynamic SEO and structured data

---

## 🎨 What Users See

### Before (No Metadata):
- Just filename: `IMG_1234.jpg`
- No additional info

### After (With Metadata):
- Custom title: "Golden Hour Wedding"
- Description, photographer, location
- Camera: "Sony A7III" with "85mm f/1.4"
- Settings: ISO 400, f/1.8, 1/200s
- Tags: #wedding #sunset #outdoor
- Info button to toggle details

---

## 🔥 Key Benefits

✅ **No Database Needed** - Simple JSON file
✅ **Optional** - Images work fine without metadata
✅ **Flexible** - Add only the fields you need
✅ **Professional** - Show technical details to impress clients
✅ **SEO Boost** - Better Google rankings
✅ **Social Ready** - Beautiful preview cards on social media
✅ **Easy Updates** - Just edit JSON and redeploy

---

## 📖 Examples

### Minimal (Just Title):
```json
"photos/studio/img.jpg": {
  "key": "photos/studio/img.jpg",
  "title": "My Great Photo"
}
```

### Full Details:
See `metadata-example.json` for complete examples!

---

## 🚀 Next Steps

1. ✅ Use `metadata-example.json` as a template
2. ✅ Add metadata for your best/featured images first
3. ✅ Upload to R2 at `photos/metadata.json`
4. ✅ Deploy and test
5. ✅ Gradually add metadata for more images

---

## 💡 Pro Tips

1. **Start Small**: Add metadata for 5-10 featured images first
2. **Use Order**: Set `"order": 1, 2, 3...` to control image sequence
3. **Be Consistent**: Use same photographer name format everywhere
4. **Tag Smart**: Use 3-7 relevant tags per image
5. **Test Social**: Share your album page on Facebook to see rich preview

---

## 🆘 Need Help?

1. Check `METADATA_GUIDE.md` for detailed documentation
2. See `metadata-example.json` for working examples
3. Verify JSON syntax at https://jsonlint.com/
4. Check R2 file path: `photos/metadata.json` (exact path matters!)

---

## 🎉 You're All Set!

Your photography website now has **professional-grade metadata capabilities**!

Start adding metadata to make your portfolio stand out! 📸✨

