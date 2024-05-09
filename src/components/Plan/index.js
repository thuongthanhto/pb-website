import React from 'react';

const Plan = () => {
  return (
    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3">
      <div className="bg-gray-0 border border-gray-80 rounded-lg hover-up p-5 lg:p-8">
        <div className="flex flex-col">
          <div className="flex items-center mb-5 gap-x-[15px]">
            <div className="flex items-center justify-center rounded-lg flex-1 h-[82px] max-w-[82px] bg-fourth-bg">
              <img
                className="shrink-0"
                src="assets/images/icons/icon-trial-plan.svg"
                alt="Trial Plan"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-bold text-first-brand text-header-5 tracking-[-0.02em]">
                Trial Plan
              </p>
              <p className="text-base font-medium text-gray-500">
                Protect for testing
              </p>
            </div>
          </div>
          <div className="flex flex-col pb-9 border-b border-gray-80 mb-8">
            <div className="flex items-center mb-1 gap-x-[3px]">
              <span className="text-header-7 font-bold text-first-brand uppercase">
                free
              </span>
              <p className="text-base font-medium text-gray-500">
                - 30 days trial
              </p>
            </div>
            <span className="text-mini-desc text-gray-500 font-medium">
              No Credit card required
            </span>
          </div>
          <ul className="flex flex-col mb-8 gap-y-[18px]">
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Brand Awareness Ads
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Retargeting Ads
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Contextual, Demographic
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Facebook Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Global Certificates
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Snapchat Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  TikTok Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Advanced List Building
                </span>
              </div>
            </li>
          </ul>
          <a
            className="w-full bg-first-brand py-4 flex items-center gap-x-3 rounded justify-center group transition-common hover:bg-first-brand-hover"
            href="#"
          >
            <span className="text-header-9 font-bold text-second-brand">
              Try for free
            </span>
            <svg
              className="text-second-brand w-5 h-5 transition-common group-hover:rotate-[-45deg]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="bg-gray-0 border border-gray-80 rounded-lg hover-up p-5 lg:p-8">
        <div className="flex flex-col">
          <div className="flex items-center mb-5 gap-x-[15px]">
            <div className="flex items-center justify-center rounded-lg flex-1 h-[82px] max-w-[82px] bg-first-bg">
              <img
                className="shrink-0"
                src="assets/images/icons/icon-standard.svg"
                alt="Standard"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-bold text-first-brand text-header-5 tracking-[-0.02em]">
                Standard
              </p>
              <p className="text-base font-medium text-gray-500">
                Advanced project
              </p>
            </div>
          </div>
          <div className="flex flex-col pb-9 border-b border-gray-80 mb-8">
            <div className="flex items-center mb-1 gap-x-[3px]">
              <span className="text-header-7 font-bold text-first-brand uppercase">
                $29
              </span>
              <p className="text-base font-medium text-gray-500">
                - user / month
              </p>
            </div>
            <span className="text-mini-desc text-gray-500 font-medium">
              Billed annually
            </span>
          </div>
          <ul className="flex flex-col mb-8 gap-y-[18px]">
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Brand Awareness Ads
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Retargeting Ads
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Contextual, Demographic
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Facebook Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Global Certificates
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Snapchat Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  TikTok Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Advanced List Building
                </span>
              </div>
            </li>
          </ul>
          <a
            className="w-full bg-first-brand py-4 flex items-center gap-x-3 rounded justify-center group transition-common hover:bg-first-brand-hover"
            href="#"
          >
            <span className="text-header-9 font-bold text-second-brand">
              Get Started
            </span>
            <svg
              className="text-second-brand w-5 h-5 transition-common group-hover:rotate-[-45deg]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="bg-gray-0 border border-gray-80 rounded-lg hover-up p-5 lg:p-8">
        <div className="flex flex-col">
          <div className="flex items-center mb-5 gap-x-[15px]">
            <div className="flex items-center justify-center rounded-lg flex-1 h-[82px] max-w-[82px] bg-second-bg">
              <img
                className="shrink-0"
                src="assets/images/icons/icon-business.svg"
                alt="Business"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-bold text-first-brand text-header-5 tracking-[-0.02em]">
                Business
              </p>
              <p className="text-base font-medium text-gray-500">
                Protect for testing
              </p>
            </div>
          </div>
          <div className="flex flex-col pb-9 border-b border-gray-80 mb-8">
            <div className="flex items-center mb-1 gap-x-[3px]">
              <span className="text-header-7 font-bold text-first-brand uppercase">
                $99
              </span>
              <p className="text-base font-medium text-gray-500">
                - user / month
              </p>
            </div>
            <span className="text-mini-desc text-gray-500 font-medium">
              Billed annually
            </span>
          </div>
          <ul className="flex flex-col mb-8 gap-y-[18px]">
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Brand Awareness Ads
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Retargeting Ads
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Contextual, Demographic
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Facebook Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Global Certificates
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="text-success w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Snapchat Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  TikTok Advertising
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-3">
                <svg
                  className="w-5 h-5 text-mutted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-header-9 text-gray-500 font-medium">
                  Advanced List Building
                </span>
              </div>
            </li>
          </ul>
          <a
            className="w-full bg-first-brand py-4 flex items-center gap-x-3 rounded justify-center group transition-common hover:bg-first-brand-hover"
            href="#"
          >
            <span className="text-header-9 font-bold text-second-brand">
              Get Started
            </span>
            <svg
              className="text-second-brand w-5 h-5 transition-common group-hover:rotate-[-45deg]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Plan;
