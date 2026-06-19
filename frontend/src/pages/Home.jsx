import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-[30px] pb-lg px-gutter max-w-container-max mx-auto overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-surface-container-highest to-transparent -z-10 rounded-bl-[100px] opacity-50 blur-3xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            {/* Hero Text */}
            <div className="flex flex-col gap-md">
              <div className="inline-flex items-center gap-2 bg-surface-container-low text-primary px-4 py-2 rounded-full w-max font-label-md text-label-md border border-surface-container-high">
                <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                Trusted by 50,000+ Students worldwide
              </div>
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">
                Learn from anywhere and build your{' '}
                <span className="text-primary relative inline-block">
                  bright career
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-secondary-container"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></path>
                  </svg>
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[90%]">
                Unlock your potential with world-class courses from industry experts. Master new skills, advance your career, and connect with a global community of learners today.
              </p>
              <div className="flex flex-col sm:flex-row gap-sm pt-4">
                <Link
                  to="/signup"
                  className="font-label-md text-label-md bg-primary text-on-primary px-8 py-4 rounded-xl hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Start Learning
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  to="/courses"
                  className="font-label-md text-label-md bg-surface text-primary border-2 border-primary-fixed px-8 py-4 rounded-xl hover:bg-surface-container-low transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Browse Courses
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6 opacity-80">
                <div className="flex -space-x-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-surface object-cover"
                    alt="Reviewer 1"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzz1AXZUreLmElUosIJDEEgNAbZ3S_lLYgv6faC-mwWku6Z6LCI4z3wCeOpFN5O2hNRCxQ_v-DfqxBdqWjv_KDKYIHJ9JO7y7zXO3Kua-RkCZzxHWu3vX4U8VzwUbvuQPAsQPK-cL82qOJTVRLV8t06Us4pdjgMw1XIROivA_aWlCAI3uOd5wPrgnrUqYVGCSlbI4CxLyT0n3sw3kkgfsCgd5w4WKebRO03XEk3wA5YKw8CRdgLeBl8ZDRXftFAzum7ECgaf-IMeY"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-surface object-cover"
                    alt="Reviewer 2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoTIf8JnsClEW3046rMIcua9eRgxuFErWJjuNH_8DAxqwGLxtoVDG5iXF4XsKpypT-E_Zv_tAR6Hdj-_mHXcsRxnoeRh559TkbBoYP8uO2sDwvmKK3dxWOxryxKiJbqlnJtlcwnr_njmWHFDqMEDlFXDOY1j-yCBml4G50fNAyGC9Kbm-zTVAxoPrVMqUlZjQF-Zs4fvZJNgsJWbz4Vu2Iap7RSONDf4cBKPQFTuUBPKhMPuNAFs7YWZK3r3zFPGXXEWDqBd6TJoc"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-surface object-cover"
                    alt="Reviewer 3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx0l-HXUHqpZo3TacoveL-A9-aCLvp1tQ5KNRW7Y6jk3pu6F9DwIWFzGApgKFrbyMcLRY62J5cmG52TFO58uhqfmArmTgi72eTzi31AKYtWkGThDwVk6k7xk0ENRgpnlUyNTmtJ1EMU7JFbRKESfk46BXiv3dozpcbg2_Y84y1C99LZTSbr7LMi_2XAb69qPosB__qFQsn_oM6zOalyEB5Hv9_amKxRCidtvq6Tei0RfEsrtTwhyEgwNM96kxkGsOr-z55ymJgso8"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center font-label-caps text-label-caps text-primary">
                    +2k
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-[#fbbf24]">
                    <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                    <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                    <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                    <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                    <span className="material-symbols-outlined text-[16px]">star_half</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant">4.8/5 from reviews</span>
                </div>
              </div>
            </div>

            {/* Hero Image with Floating Elements */}
            <div className="relative h-[600px] w-full flex items-center justify-center">
              {/* Main Image Area */}
              <div className="relative w-[85%] h-[85%] bg-surface-container-highest rounded-[40px] overflow-hidden shadow-lg border-4 border-surface z-10">
                <img
                  className="w-full h-full object-cover"
                  alt="Student learning"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpRwvqLQUYQ0EsipvFDSoQQ8Z1wZVeQZYsz1iB1lApkYkh9qBYiWxuz-vTjkzqv6Jjuc2E4JBT5qdznnSLRfBmD9Is7_83zTt8YUMjzfqriKA9tt532c4cJliJKZ1PvdxUV5DNr6j1IniCPx5Uwk67slm2dMN2yts7kSeTm0QHNk5i9Eq_vDvp0Gs4C7YcuYMEWODV3fieHyr-e9E_9myVPRR81JfOsXCmu7sJ4SJEtdZ_phr-r3RmeJV3A0clQOBgU3EOQypbZ2o"
                />
              </div>

              {/* Floating Stat Card 1 */}
              <div
                className="absolute top-20 -left-6 bg-surface p-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-outline-variant flex items-center gap-4 z-20 animate-bounce"
                style={{ animationDuration: '4s' }}
              >
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined icon-fill">library_books</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-background">1,235+</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">Online Courses</span>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div
                className="absolute bottom-32 -right-4 bg-surface p-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-outline-variant flex flex-col gap-2 z-20 animate-bounce"
                style={{ animationDuration: '5s', animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-background">4.8</span>
                  <div className="flex text-[#fbbf24]">
                    <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                    <span className="material-symbols-outlined text-[18px] icon-fill">star</span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">Average Rating</span>
                {/* Mini Avatar Stack */}
                <div className="flex -space-x-2 mt-1">
                  <img
                    className="w-6 h-6 rounded-full border border-surface object-cover"
                    alt="Tiny profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-RxmTSFi_GNDq-dTHsRCp-f2NmtyS6AdrzXHgQ8NylwWrRq4h4gee3VCi5TO3D_KxaBOrek_92Q581vaPrjJ6PRMrnBYVbh7hKR8CZuNgG_AxH4PgbrW7lQ4OtyDug4NuVWmUF3Bh6es8r7fHr8wDaCHUlPXmpm4f4NSuhNdUAveV2-vFhhCFpt2CDuYRPS3zul5YiRE9_zLaBvVfrVwMxta7Tncy-3iOHDX-KeCRUtQbt53X5vzDOcO9OJ3WS4KszdJBU3tXwqA"
                  />
                  <img
                    className="w-6 h-6 rounded-full border border-surface object-cover"
                    alt="Tiny profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc58GOLyEc8g-SsUGABn8iTTYYyCJfa8aK8BaaeqEtYlxvdhpmuOGWfHb7DB1S9a5htMmiXuz1xDNiEaru2xO89gBu7Hpt_6r46HNtz8kiq1mkoSNnCC5osKinTrL0plEKOyPETcR1M8Slmvu5sRrjHO1ueWman5TbYnm6JvsMbuy11t6ak5lvLfix7XRw_ZKjlgTU2bDr7fUSRGLvZXNPfrGx9U8oVcUEWXpBvGJaPIKHoS-bm8sDx1JaMPP1kwwjBYpzD7pLsCA"
                  />
                  <img
                    className="w-6 h-6 rounded-full border border-surface object-cover"
                    alt="Tiny profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM22L9MhXita2DOQb_eV3TCyA9UjIOMnv7W2DxKnAePGf5aLJeeySEmC8aAs-9Q-uB_IJZMET1WnVFNp-kqxTn8pq_fWG_v22gtRA6w-Z8N0iQTw0tZcJUDJHFe_GJt-GA9Bv_Rx_1p2gCwQUwZSpQDlLbgjkOYRIzyJMiAUXuKkKocPiGUX9Nflq6-RHXEoVUB7sxqGudSFIf9cAbrjYq4VqyuSdVkCDXnYzAKkx4GYhgwIej77Rd8YJAc2U1gdMSGY-auy7QJ40"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories Bento Grid */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-headline-md text-on-background mb-4">Top Categories</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Explore our wide range of categories and find the perfect course to advance your skills.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Category Card 1 */}
            <Link className="group relative overflow-hidden bg-surface-container-low rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-surface-container-high transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-1 aspect-square border border-surface-variant" to="/courses">
              <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[40px]">code</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-background group-hover:text-primary transition-colors">Development</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">120+ Courses</p>
              </div>
            </Link>

            {/* Category Card 2 */}
            <Link className="group relative overflow-hidden bg-surface-container-low rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-surface-container-high transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-1 aspect-square border border-surface-variant" to="/courses">
              <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[40px]">trending_up</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-background group-hover:text-primary transition-colors">Business</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">85+ Courses</p>
              </div>
            </Link>

            {/* Category Card 3 */}
            <Link className="group relative overflow-hidden bg-surface-container-low rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-surface-container-high transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-1 aspect-square border border-surface-variant" to="/courses">
              <div className="w-20 h-20 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[40px]">brush</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-background group-hover:text-primary transition-colors">Design</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">64+ Courses</p>
              </div>
            </Link>

            {/* Category Card 4 */}
            <Link className="group relative overflow-hidden bg-surface-container-low rounded-[24px] p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-surface-container-high transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-1 aspect-square border border-surface-variant" to="/courses">
              <div className="w-20 h-20 rounded-full bg-error-container text-on-error-container flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[40px]">data_usage</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-background group-hover:text-primary transition-colors">Data Science</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">92+ Courses</p>
              </div>
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <Link className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant flex items-center gap-2 group" to="/courses">
              View All Categories
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
