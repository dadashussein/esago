import { trefoil } from 'ldrs'
trefoil.register()

const Loading = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center  bg-gray-100 dark:bg-[#31363F] bg-opacity-75">
            <l-trefoil color="black"></l-trefoil>
        </div>
    );
};

export default Loading;
