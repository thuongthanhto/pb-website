/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from '@material-tailwind/react'
import { NextSeo } from 'next-seo'
import { IconButton } from '@material-tailwind/react'
import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa'

import Reportage from '@/components/Reportage'
import Studio from '@/components/Studio'
import MakeUp from '@/components/MakeUp'

export default function Home() {
  return (
    <>
      <NextSeo
        title="PBImages"
        titleTemplate="PBImages - Photography Studio"
        defaultTitle="PBImages - Photography Studio"
        description="I am a Photographer with over 10 years of experience. I am passionate about photography and I love to capture the beauty of life through my lens. I specialize in studio photography, portrait photography, and event photography. I am dedicated to providing high-quality images that capture the essence of the moment. Contact me today to book a session!"
        canonical="https://phatbo.info"
        openGraph={{
          url: 'https://phatbo.info',
          title: 'PBImages',
          description:
            'I am a Photographer with over 10 years of experience. I am passionate about photography and I love to capture the beauty of life through my lens. I specialize in studio photography, portrait photography, and event photography. I am dedicated to providing high-quality images that capture the essence of the moment. Contact me today to book a session!',
          images: [
            {
              url: '/avatar.png',
              width: 200,
              height: 200,
              alt: 'PBImages - Photography Studio',
            },
          ],
        }}
      />
      <Layout>
        <section className="container mx-auto  mt-[50px]">
          <div className="flex justify-center">
            <IconButton
              variant="outlined"
              className="mx-2"
              onClick={() =>
                window.open('https://www.facebook.com/PhatBo0905', '_blank')
              }
            >
              <FaFacebook className="text-[18px]" />
            </IconButton>

            <IconButton variant="outlined" className="mx-2">
              <a href="tel:+84909383332">
                <FaPhone className="text-[18px]" />
              </a>
            </IconButton>

            <IconButton variant="outlined" className="mx-2">
              <a href="mailto:phatchay95@gmail.com">
                <FaEnvelope className="text-[18px]" />
              </a>
            </IconButton>
          </div>
        </section>
        <section className="w-1/2 mx-auto py-[50px]">
          <h1 className="text-center text-[30px] font-bold">
            PHOTOS TAKEN BY ME
          </h1>
          <hr className="title-break" />

          <div className="italic text-center text-sm">
            <p>
              Below are some representative photo sets of mine over the past 10
              years, they are the works that I have done with dedication and
              passion in my profession. I hope that you will find special
              emotions and experiences when enjoying these works.
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
                Reportage
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="studio">
                <Studio />
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      window.open(
                        'https://drive.google.com/drive/folders/1MyB2TybBbNyT6s2P6pwvNq1ijbaPGyzU',
                        '_blank'
                      )
                    }
                  >
                    View more
                  </Button>
                </div>
              </TabPanel>
              <TabPanel value="reportage">
                <Reportage />
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      window.open(
                        'https://drive.google.com/drive/folders/1ybNKbbyrqn_Sd8D92Shyf6-pnxXy1SjW',
                        '_blank'
                      )
                    }
                  >
                    View more
                  </Button>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </section>

        <section className="w-1/2 mx-auto py-[50px]">
          <h1 className="text-center text-[30px] font-bold uppercase">
            Team personnel
          </h1>
          <hr className="title-break" />

          <div className="italic text-center text-sm">
            <p>
              I'd like to introduce you to the members of my team - a group of
              professional and passionate photographers, ready to deliver the
              most amazing and creative photos for our clients.
            </p>
            <p className="mt-2">
              My team consists of experienced and talented photographers. With
              their expertise and diverse skills, I ensure that each photograph
              captured will bring you outstanding beauty and creativity.
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
                src="/phat.png"
                alt="avatar"
                width={320}
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
                src="/tuanluong.jpg"
                alt="avatar"
                width={320}
              />
              <div className="flex flex-col items-center">
                <h2 className="text-[18px] font-bold uppercase mt-4">
                  Tuan Luong
                </h2>
                <div className="text-[12px] italic">
                  Photography & Support lighting
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-[50px]">
          <h1 className="text-center text-[30px] font-bold uppercase">
            Make up & Hair
          </h1>
          <hr className="title-break" />

          <MakeUp />
        </section>

        <h1 className="text-center text-[30px] font-bold uppercase mt-16">
          Video
        </h1>
        <hr className="title-break" />
        <section className="container mx-auto video-container mb-[200px]">
          <iframe
            src="https://drive.google.com/file/d/1MhGoaGGvJcEafUR30zKdx3l8gr_Pp5-L/preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ height: '768px' }}
          ></iframe>
        </section>
      </Layout>
    </>
  )
}
