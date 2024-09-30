import { EnvelopeIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <div className="bg-zinc-950 font-poppins h-fit px-3 py-16">
      <div className="max-w-screen-2xl mx-auto text-white text-xs">
        <div className="flex items-top">
          <div className="w-1/4 inline-block">
            <span className="font-semibold">Explore</span>
            <div className="mt-2">
              <a
                href="/home"
                className="block text-white no-underline hover:underline py-1 w-fit"
              >
                Home
              </a>
              <a
                href="/library"
                className="block text-white no-underline hover:underline py-1 w-fit"
              >
                Library
              </a>
            </div>
          </div>
          <div className="w-1/4 inline-block">
            <span className="font-semibold">Contact us</span>
            <div className="mt-2">
              <a href="mailto:bage.josifoska@gmail.com" target="_blank">
                <EnvelopeIcon
                  width={24}
                  height={24}
                  className="inline-block"
                  fill="white"
                />
              </a>

              <a href="https://www.instagram.com" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="inline-block"
                >
                  <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                </svg>
              </a>

              <a href="https://www.facebook.com" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="inline-block"
                >
                  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-zinc-800 text-zinc-300 pt-3 text-center">
          Copyright &copy; 2024 MovieRecc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
