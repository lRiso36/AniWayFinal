// src/components/TermsModal.tsx
import { privacyContent } from "../../lib/termsContent";

type Props = {
    onClose: () => void;
}

export const TermsModal = ({ onClose }: Props) => {
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden">

                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                    <p className="text-white font-semibold text-sm">Privacy Policy & Terms of Service</p>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white/70 transition-colors text-lg leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* content */}
                <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
                    {privacyContent.map((item, i) => {
                        if (item.type === 'title') return (
                            <h2 key={i} className="text-white font-bold text-base sm:text-lg mt-4 first:mt-0">
                                {item.text}
                            </h2>
                        );
                        if (item.type === 'subtitle') return (
                            <h3 key={i} className="text-white/80 font-semibold text-[10px] sm:text-[12px] -mt-3">
                                {item.text}
                            </h3>
                        );
                        if (item.type === 'list') return (
                            <ul key={i} className="flex flex-col gap-2 list-disc list-outside pl-5">
                                {item.items?.map((bullet, j) => (
                                    <li key={j} className="text-white/60 text-xs sm:text-sm leading-relaxed">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        );
                        return (
                            <p key={i} className="text-white/60 text-xs sm:text-sm leading-relaxed">
                                {item.text}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};