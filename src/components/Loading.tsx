type LoadingType = {
    loading: boolean;
}

export const Loading = ({ loading }: LoadingType) => {
    if (!loading) return null

    return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export const BareLoading = ({ loading }: LoadingType) => {
    if (!loading) return null

    return (
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    )
}

export const MiniLoading = ({ loading }: LoadingType) => {
    if (!loading) return null

    return (
        <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export const TinyLoading = ({ loading }: LoadingType) => {
    if (!loading) return null

    return (
        <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}