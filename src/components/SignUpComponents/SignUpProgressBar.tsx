type ProgressBarTypes = {
    step: number;
}

export const ProgressBar = ({step}: ProgressBarTypes) => {
    return (
        <div className="progressBar flex gap-2 mb-8">
            {[1,2,3].map(i => (
                <div 
                    key={i}
                    className="
                    h-1 
                    flex-1 
                    rounded-full 
                    transition-all 
                    duration-500
                    "
                    style= {{
                        background: step >= i 
                            ? "#9333ea" 
                            : "rgba(255,255,255,0.1)"
                    }}
                >
                </div>    
            ))}
        </div>
    )
}