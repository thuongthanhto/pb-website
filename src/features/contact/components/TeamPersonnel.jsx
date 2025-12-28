export function TeamPersonnel() {
  const teamMembers = [
    {
      name: 'Lĩnh',
      role: 'Quay phim',
      image: '/linh.png',
      hasGrayscale: true,
    },
    {
      name: 'Phat Bo',
      role: 'Nhiếp ảnh chính',
      image: '/avatar.jpg',
      hasGrayscale: false,
    },
  ]

  return (
    <div className="px-6 md:px-10 lg:px-40 flex justify-center py-20 bg-white">
      <div className="max-w-[1024px] w-full flex flex-col items-center gap-12">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-main">
            Đội ngũ của chúng tôi
          </h2>
          <div className="w-16 h-1 bg-text-main rounded-full"></div>
          <div className="text-text-body text-lg leading-relaxed font-light italic flex flex-col gap-4">
            <p>
              Tôi xin giới thiệu với bạn các thành viên trong đội ngũ của tôi -
              một nhóm các nhiếp ảnh gia chuyên nghiệp và nhiệt tình, sẵn sàng
              cung cấp những bức ảnh tuyệt vời và sáng tạo nhất cho các khách
              hàng của chúng tôi.
            </p>
            <p>
              Đội ngũ của tôi bao gồm những nhiếp ảnh gia có kinh nghiệm và tài
              năng. Với chuyên môn và kỹ năng đa dạng của họ, tôi đảm bảo rằng
              mỗi bức ảnh được chụp sẽ mang lại cho bạn vẻ đẹp và sáng tạo ngoạn
              mục.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start gap-16 mt-8 w-full">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-5 w-full md:w-1/2 max-w-md"
            >
              <div
                className={`aspect-square w-full rounded-3xl bg-cover bg-center shadow-lg hover:shadow-soft transition-all duration-500 hover:-translate-y-2 ${
                  member.hasGrayscale ? 'grayscale hover:grayscale-0' : ''
                }`}
                style={{ backgroundImage: `url("${member.image}")` }}
              ></div>
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-text-main">
                  {member.name}
                </h3>
                <p className="text-lg text-text-body font-serif italic mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
