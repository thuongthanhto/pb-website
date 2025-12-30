# Folder Mapping Configuration

## Current Folder Structure

Your photography website now uses the following folder structure from your Google Cloud Storage / R2 bucket:

```
ten-g-storage/photos/
├── T&K/          # T&K category
├── V&K/          # V&K category
├── outdoor/      # Outdoor/Nature photography
└── studio/       # Studio photography
```

## Folder Mapping

The system automatically maps the storage folders to display names in Vietnamese:

| Storage Folder | Display Name (Vietnamese) | Description |
|---------------|---------------------------|-------------|
| `studio`      | Studio                    | Studio photography |
| `outdoor`     | Ngoại cảnh               | Outdoor/Location photography |
| `T&K`         | T&K                       | T&K category |
| `V&K`         | V&K                       | V&K category |

## How It Works

### 1. **Storage Structure**
Images are stored in your R2/S3-compatible bucket with this structure:
```
photos/
  studio/
    image1.jpg
    image2.jpg
  outdoor/
    image1.jpg
  T&K/
    image1.jpg
  V&K/
    image1.jpg
```

### 2. **Folder Detection**
The system automatically:
- Scans all files in the `photos/` folder
- Extracts the folder name from the path (e.g., `photos/studio/image.jpg` → `studio`)
- Filters to show only image files (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`)

### 3. **Filter Buttons**
On the Albums page, users see filter buttons:
- **Tất cả** - Show all images
- **Studio** - Show only studio folder images
- **Ngoại cảnh** - Show only outdoor folder images
- **T&K** - Show only T&K folder images
- **V&K** - Show only V&K folder images

The buttons are automatically generated based on what folders exist in your storage.

## Files Modified

1. **`src/features/albums/components/AlbumsSection.jsx`**
   - Updated `folderMap` object with new folder mappings

2. **`src/features/albums/components/FilterButtons.jsx`**
   - Updated `folderMap` to display correct Vietnamese names

3. **`src/lib/r2-albums.ts`**
   - Updated comments to reflect new folder structure

## Environment Variables Required

Make sure you have these environment variables set in your `.env.local` or Vercel:

```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_BUCKET_NAME=ten-g-storage
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
```

## Adding New Folders

To add a new folder category:

1. **Upload images** to a new folder in your R2 bucket:
   ```
   photos/
     new-category/
       image1.jpg
   ```

2. **Update the folder mappings** in both files:

   **AlbumsSection.jsx:**
   ```javascript
   const folderMap = {
     'Studio': 'studio',
     'Ngoại cảnh': 'outdoor',
     'T&K': 'T&K',
     'V&K': 'V&K',
     'New Category': 'new-category', // Add this line
   };
   ```

   **FilterButtons.jsx:**
   ```javascript
   const folderMap = {
     'studio': 'Studio',
     'outdoor': 'Ngoại cảnh',
     'T&K': 'T&K',
     'V&K': 'V&K',
     'new-category': 'New Category', // Add this line
   };
   ```

3. **Redeploy** your application

## Features

✅ Automatic folder detection from R2/S3 storage
✅ Client-side filtering (fast performance)
✅ Lazy loading (20 images per batch)
✅ Responsive image gallery
✅ Full-screen image viewer with keyboard navigation
✅ Modern UI with Tailwind CSS v4

## Performance Notes

- Images are fetched at build time (Static Site Generation)
- Filter buttons work client-side for instant response
- Images load progressively with "Load More" button
- Supports keyboard navigation (←, →, Esc)

## Troubleshooting

### Images not showing up?
1. Check that images are in the correct folder structure: `photos/{folder-name}/`
2. Verify file extensions are supported (jpg, jpeg, png, gif, webp)
3. Check R2 credentials in environment variables

### Filter buttons not appearing?
1. Make sure images exist in those folders
2. Check that folder names match exactly (case-sensitive)
3. Rebuild the application to fetch latest data

### New folder not displaying?
1. Add the folder mapping in both `AlbumsSection.jsx` and `FilterButtons.jsx`
2. Redeploy the application

