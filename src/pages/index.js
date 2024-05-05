/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import Head from 'next/head';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import Reportage from '@/components/Reportage';
import Studio from '@/components/Studio';

export default function Home() {
  return (
    <>
      <Head>
        <title>PBImages</title>
      </Head>
      <Layout>
        <section className="w-1/2 mx-auto py-[50px]">
          <h1 className="text-center text-[30px] font-bold">
            CÁC BỘ ẢNH ĐÃ THỰC HIỆN
          </h1>
          <hr className="title-break" />

          <div className="italic text-center text-sm">
            <p>
              Dưới đây là những bộ ảnh tiêu biểu của tôi trong 10 năm vừa qua,
              đó là những tác phẩm mà tôi đã thực hiện với tâm huyết và sự đam
              mê trong nghề. Tôi hy vọng rằng các bạn sẽ tìm thấy những cảm xúc
              và trải nghiệm đặc biệt khi chiêm ngưỡng những tác phẩm này.
            </p>
          </div>
        </section>

        <section className="container mx-auto">
          <Tabs value="studio">
            <TabsHeader
              className="bg-transparent"
              indicatorProps={{
                className:
                  'border-b-2 border-blue-600 rounded-none shadow-none',
              }}
            >
              <Tab value="studio" className="font-bold ">
                Studio
              </Tab>
              <Tab value="reportage" className="font-bold">
                Phóng sự
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="studio">
                <Studio />
              </TabPanel>
              <TabPanel value="reportage">
                <Reportage />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </section>

        <section className="w-1/2 mx-auto py-[50px]">
          <h1 className="text-center text-[30px] font-bold">ĐỘI NGŨ NHÂN SỰ</h1>
          <hr className="title-break" />

          <div className="italic text-center text-sm">
            <p>
              Tôi muốn giới thiệu với bạn các thành viên trong đội ngũ nhân sự
              của tôi - đội ngũ những người nhiếp ảnh chuyên nghiệp và đam mê,
              sẵn sàng đưa ra những bức ảnh tuyệt vời và sáng tạo nhất cho khách
              hàng.
            </p>
            <p className="mt-2">
              Đội ngũ nhân sự của tôi bao gồm các photographer có nhiều kinh
              nghiệm và tài năng. Với sự chuyên môn và kỹ năng đa dạng, tôi sẽ
              đảm bảo rằng mỗi bức ảnh được chụp sẽ mang đến cho bạn sự đẹp
              tuyệt vời và sáng tạo.
            </p>
          </div>
        </section>

        <section className="container mx-auto my-[50px] flex flex-col sm:flex-row sm:space-x-4 sm:justify-center">
          <div className="flex flex-col items-center">
            <div>
              <img
                className="rounded-tl-[10px] rounded-tr-[10px]"
                src="/linh.png"
                alt="avatar"
                width={320}
                height={330}
              />
              <div className="flex flex-col items-center">
                <h2 className="text-[18px] font-bold uppercase mt-4">Lĩnh</h2>
                <div className="text-[12px] italic">Videography</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <img
                className="rounded-tl-[10px] rounded-tr-[10px]"
                src="/avatar.jpg"
                alt="avatar"
                width={320}
                height={330}
              />
              <div className="flex flex-col items-center">
                <h2 className="text-[18px] font-bold uppercase mt-4">
                  Phat Bo
                </h2>
                <div className="text-[12px] italic">Main Photography</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <img
                className="rounded-tl-[10px] rounded-tr-[10px]"
                src="/tri.jpg"
                alt="avatar"
                width={320}
                height={330}
              />
              <div className="flex flex-col items-center">
                <h2 className="text-[18px] font-bold uppercase mt-4">Trí</h2>
                <div className="text-[12px] italic">
                  Photography & Support lighting
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
