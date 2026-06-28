
type RatingSliderType = {
    value: number | null;
    onChange: (value: number | null) => void;
}

export const RatingSlider = ({value, onChange}: RatingSliderType) => {
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex-items-center justify-between"> 
                <label className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">
                Your Rating : </label>
                {value !== null ? (
                     <span className="text-white font-medium text-sm sm:text-base">{value.toFixed(1)}</span>
                ) : (
                    <span className="text-white/30 text-sm">—</span>
                )
                }
            </div>
            <div className="flex items-center gap-3">
                <input
                    type="range"
                    min={1}
                    max={10}
                    step={0.1}
                    value={value ?? 5}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="flex-1 accent-purple-600 outline-none appearance-none"
                />  
            </div>
            <div className="flex justify-between">
                <span className="text-white/30 text-xs sm:text-base">1</span>
                <button
                    onClick={() => onChange(null)}
                    className="text-white/30 hover:text-white/70 transition-colors text-sm sm:text-base"
                >
                    Clear rating
                </button>
                <span className="text-white/30 text-xs sm:text-base">10</span>
            </div>
        </div>
    );
}