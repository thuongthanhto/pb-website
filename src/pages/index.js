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
              <Tab value="studio" className="font-bold">
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
              <TabPanel value="studio">Studio</TabPanel>
              <TabPanel value="reportage">Studio</TabPanel>
              <TabPanel value="family">Studio</TabPanel>
            </TabsBody>
          </Tabs>
        </section>
      </Layout>
    </>
  );
}
