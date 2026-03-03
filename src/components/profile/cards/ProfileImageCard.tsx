import { Card } from "../../ui/card";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { cardHoverTransition, cardItemVariants } from "./motion";

type ProfileImageCardProps = {
  order: number;
};

type ProfileInfoSectionProps = {
  title: string;
  items: React.ReactNode[];
};

function ProfileInfoSection({ title, items }: ProfileInfoSectionProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        {items.map((item) => (
          <li key={`${title}-${item}`} className="text-sm font-medium text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProfileImageCard({ order }: ProfileImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open profile image"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        className="block h-full w-full aspect-square rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
        initial="hidden"
        animate="show"
        variants={cardItemVariants}
        custom={order}
        whileHover={{ y: -2, transition: cardHoverTransition }}
      >
        <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-md">
          <img
            src="/profile.jpg"
            alt="Limtaehyun profile photo"
            className="h-full w-full object-cover grayscale transition duration-300 hover:grayscale-0"
          />
        </Card>
      </motion.button>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Profile image modal"
              className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-card shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 z-10 rounded-full bg-card/95 p-2 text-foreground transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid max-h-[85vh] overflow-y-auto p-8">
                <div className="flex items-center gap-4 mb-5 border-b border-border pb-5">
                  <img
                    src="/profile.jpg"
                    alt="Limtaehyun profile"
                    className="h-24 w-24 object-contain rounded-lg"
                  />
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      임태현, Limtaehyun
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground/80">
                      🎂 2005년 10월 12일 ({new Date().getFullYear() - 2005}세)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="text-sm font-medium text-foreground/80">운영을 수동 관리가 아닌 통제 가능한 시스템으로 설계하는 DevOps 엔지니어입니다.</p>
                  <ProfileInfoSection
                    title="교육"
                    items={["경북 소프트웨어 특성화고등학교 (소프트웨어개발과)"]}
                  />
                  <ProfileInfoSection
                    title="경력"
                    items={["(주)리비바이오 (2024년 1월 ~ 재직)"]}
                  />
                  <ProfileInfoSection
                    title="연락처"
                    items={[<a href="mailto:contact@lth.so">contact@lth.so</a>, <a href="tel:+821037290245">+82 10-3729-0245</a> ]}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
