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
              <Tab value="family" className="font-bold">
                Gia đình
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="studio">
                {' '}
                <div className="flex justify-around">
                  <div className="p-10">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                      <img className="w-full" src="/temp.jpg" alt="Mountain" />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Mountain</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Voluptatibus quia, Nonea! Maiores et perferendis
                          eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #photography
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #travel
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #winter
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                      <img className="w-full" src="/temp.jpg" alt="Mountain" />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Mountain</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Voluptatibus quia, Nonea! Maiores et perferendis
                          eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #photography
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #travel
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #winter
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                      <img className="w-full" src="/temp.jpg" alt="Mountain" />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Mountain</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Voluptatibus quia, Nonea! Maiores et perferendis
                          eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #photography
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #travel
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #winter
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="reportage">Studio</TabPanel>
              <TabPanel value="family">Studio</TabPanel>
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

        <section className="container mx-auto my-[50px]">
          <div className="flex flex-col items-center">
            <div>
              <img
                className="rounded-tl-[10px] rounded-tr-[10px]"
                src="/avatar.jpg"
                alt="avatar"
                width={320}
              />
              <div className="flex flex-col items-center">
                <h2 className="text-[18px] font-bold uppercase mt-4">
                  Phat Bo
                </h2>
                <div className="text-[12px] italic">Photographer</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
