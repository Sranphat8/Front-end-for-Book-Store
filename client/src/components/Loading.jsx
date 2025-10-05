const Loading = ({ text = "กำลังโหลด..." }) => {
    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-2 text-lg text-gray-600">{text}</p>
        </div>
    );
};

export default Loading;