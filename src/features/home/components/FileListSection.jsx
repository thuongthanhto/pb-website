export function FileListSection({ files }) {
  if (!files || files.length === 0) {
    return (
      <div className="w-full bg-surface-light py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-8">File từ R2</h2>
          <p className="text-gray-500">Không tìm thấy file nào trong R2 bucket.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface-light py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-3xl font-bold mb-8">Danh sách file từ R2</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.Key}
              className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition-shadow bg-white"
            >
              <p className="font-semibold text-sm text-gray-800 truncate mb-2">
                {file.Key}
              </p>
              <p className="text-xs text-gray-500">
                Kích thước: {(file.Size / 1024).toFixed(2)} KB
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Cập nhật: {new Date(file.LastModified).toLocaleDateString('vi-VN')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
