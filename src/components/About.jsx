import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";

const About = () => {
  const navigate = useNavigate();
  const { vibrate } = useApp();

  const goTo = (path) => {
    vibrate(30);
    navigate(path);
  };

  const legalItems = [
    {
      icon: "📄",
      title: "Terms of Service",
      content: (
        <>
          By accessing <strong>Lovers Play</strong>, you agree to use the app
          solely for personal entertainment purposes. You must be at least{" "}
          <strong>18 years of age</strong> to use the Explicit (Crazy) game
          mode. The company does not tolerate illegal, malicious, or abusive
          use of the platform. We reserve the right to update these terms at
          any time.
        </>
      ),
    },
    {
      icon: "🔒",
      title: "Privacy Policy",
      content: (
        <>
          We respect your privacy. <strong>We do not track you, we do not
          collect your personal data, and we do not use cookies.</strong>{" "}
          Names, photos, and inputs are processed locally on your device using
          browser storage where applicable. When you create a slideshow image,
          it is generated on your phone or computer rather than being uploaded
          by the app.
        </>
      ),
    },
    {
      icon: "⚠️",
      title: "User Responsibility & Disclaimer",
      content: (
        <>
          Lovers Play is intended for consenting adults. The Spicy and Crazy
          modes contain suggestive or explicit content. By selecting these
          modes, you confirm that both participants are comfortable with the
          prompts. The company is <strong>not liable</strong> for emotional
          distress, awkwardness, disagreements, or disputes that may arise
          during gameplay. Always communicate clearly and respect your
          partner's boundaries.
        </>
      ),
    },
    {
      icon: "🛡️",
      title: "Intellectual Property",
      content: (
        <>
          The <strong>Lovers Play</strong> name, logo, game code, and design
          elements are the exclusive property of{" "}
          <strong>SELEC-DORCO (PTY) LTD</strong>. You may not copy, modify,
          distribute, or sell any part of the app without explicit written
          permission from the company. Third-party music links remain the
          property of their respective owners.
        </>
      ),
    },
  ];

  const features = [
    {
      icon: "🎮",
      title: "6 Couple Games",
      description:
        "Quizzes, choices, dares, compatibility and memory games made for two.",
    },
    {
      icon: "📱",
      title: "No Download",
      description:
        "Open Lovers Play in your browser and start playing immediately.",
    },
    {
      icon: "💬",
      title: "Made to Share",
      description:
        "Send challenges and results to your person through familiar apps.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description:
        "Designed around simple, personal couple experiences without accounts.",
    },
  ];

  return (
    <div className="pb-7">
      {/* =====================================================
          BRAND HERO
      ====================================================== */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-[34px] bg-[#171717] px-6 py-8 text-white shadow-[0_24px_65px_rgba(23,23,23,0.20)]">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-[#ff4d6d] to-[#ff365c] text-5xl shadow-[0_18px_40px_rgba(255,77,109,0.30)]">
              ❤️
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">
              Made for two
            </div>

            <h1 className="mt-3 font-playfair text-4xl font-bold tracking-tight">
              Lovers Play
            </h1>

            <p className="mt-2 text-sm font-medium text-white/55">
              Games made for lovers ❤️
            </p>

            <p className="mx-auto mt-5 max-w-[290px] text-[11px] leading-5 text-white/40">
              A playful space for couples to laugh, flirt, compete, discover
              each other and create memories together.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-[22px] bg-gradient-to-r from-[#ff4d6d] to-[#ff365c] px-4 py-4 text-xs font-bold text-white shadow-[0_12px_30px_rgba(255,77,109,0.22)] transition-all active:scale-[0.97]"
          onClick={() => goTo("/games")}
        >
          🎮 Explore Games
        </button>

        <button
          type="button"
          className="rounded-[22px] bg-white px-4 py-4 text-xs font-bold text-[#171717] shadow-[0_12px_30px_rgba(31,20,24,0.07)] transition-all active:scale-[0.97]"
          onClick={() => goTo("/create")}
        >
          ✨ Create a Game
        </button>
      </section>

      {/* =====================================================
          WHY LOVERS PLAY
      ====================================================== */}
      <section className="mt-8">
        <div className="section-label">
          Why Lovers Play
        </div>

        <h2 className="mt-3 font-playfair text-2xl font-bold text-[#171717]">
          More than games.
          <br />
          More moments together.
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-gray-400">
          Lovers Play was designed to make ordinary couple moments a little
          more playful, memorable and exciting.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="soft-card p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0f3] text-xl">
                {feature.icon}
              </div>

              <h3 className="mt-4 text-xs font-bold text-[#171717]">
                {feature.title}
              </h3>

              <p className="mt-1.5 text-[9px] leading-5 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          THE LOVERS PLAY EXPERIENCE
      ====================================================== */}
      <section className="mt-7">
        <div className="relative overflow-hidden rounded-[30px] border border-[#ff4d6d]/10 bg-[#fff7f8] p-5">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ff4d6d]/10 blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                💞
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff4d6d]">
                  The idea
                </p>

                <h3 className="mt-1 text-sm font-bold text-[#171717]">
                  Play together, wherever you are.
                </h3>
              </div>
            </div>

            <p className="mt-4 text-[11px] leading-6 text-gray-500">
              Whether you are sitting next to each other, on a date, laughing
              over WhatsApp, or miles apart, Lovers Play gives you simple ways
              to keep the connection going.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <span className="text-lg">😂</span>
                <p className="mt-2 text-[9px] font-bold text-[#171717]">
                  Laugh
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <span className="text-lg">💕</span>
                <p className="mt-2 text-[9px] font-bold text-[#171717]">
                  Connect
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <span className="text-lg">✨</span>
                <p className="mt-2 text-[9px] font-bold text-[#171717]">
                  Remember
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LEGAL
      ====================================================== */}
      <section className="mt-8">
        <div className="section-label">
          Important information
        </div>

        <h2 className="mt-3 font-playfair text-2xl font-bold text-[#171717]">
          Legal & Terms
        </h2>

        <p className="mt-2 text-[10px] leading-5 text-gray-400">
          A few important things to know before using Lovers Play.
        </p>

        <div className="mt-4 overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-[0_12px_40px_rgba(31,20,24,0.06)]">
          {legalItems.map((item, index) => (
            <details
              key={item.title}
              className={`group ${
                index !== legalItems.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 transition-colors hover:bg-gray-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-lg">
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-[#171717]">
                    {item.title}
                  </span>

                  <span className="mt-0.5 block text-[9px] text-gray-400">
                    Tap to read
                  </span>
                </span>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-transform duration-200 group-open:rotate-180">
                  ↓
                </span>
              </summary>

              <div className="px-5 pb-5">
                <div className="rounded-2xl bg-[#fafafa] p-4">
                  <p className="text-[10px] leading-5 text-gray-500">
                    {item.content}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* =====================================================
          COMPANY
      ====================================================== */}
      <section className="mt-8">
        <div className="section-label">
          Behind Lovers Play
        </div>

        <div className="soft-card mt-3 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#171717] text-2xl">
              💼
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                Developed by
              </p>

              <h3 className="mt-1 text-base font-bold text-[#171717]">
                SELEC-DORCO (PTY) LTD
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-gray-400">
                Proudly creating digital experiences designed to bring people
                closer and make everyday moments more memorable.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400">
                Platform
              </p>
              <p className="mt-1 text-xs font-bold text-[#171717]">
                Lovers Play
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3">
              <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400">
                Year
              </p>
              <p className="mt-1 text-xs font-bold text-[#171717]">
                © 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ====================================================== */}
      <section className="mt-8">
        <div className="relative overflow-hidden rounded-[30px] bg-[#171717] p-6 text-center text-white">
          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#ff4d6d]/15 blur-2xl" />
          <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              💌
            </div>

            <h3 className="mt-4 font-playfair text-2xl font-bold">
              We'd love to hear from you.
            </h3>

            <p className="mx-auto mt-2 max-w-[280px] text-[10px] leading-5 text-white/45">
              Questions, feedback, support or legal enquiries? Reach out to
              the Lovers Play team.
            </p>

            <a
              href="mailto:sandiledr100@gmail.com"
              onClick={() => vibrate(20)}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-bold text-[#171717] transition-all active:scale-[0.97]"
            >
              ✉️ sandiledr100@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          BRAND FOOTER
      ====================================================== */}
      <section className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ff4d6d]/10 bg-[#fff7f8] px-4 py-2">
          <span className="text-sm">❤️</span>
          <span className="text-[9px] font-bold text-[#ff4d6d]">
            Made for lovers in the kasi and beyond
          </span>
        </div>

        <p className="mt-5 text-[9px] leading-5 text-gray-300">
          © 2026 SELEC-DORCO (PTY) LTD. All Rights Reserved.
          <br />
          Designed with love for the modern couple.
        </p>

        <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-gray-200">
          <span className="h-px w-12 bg-gray-200" />
          <span>♥</span>
          <span className="h-px w-12 bg-gray-200" />
        </div>
      </section>
    </div>
  );
};

export default About;