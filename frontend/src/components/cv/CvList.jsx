const CvList = ({ cv, darkColors, lightColors, exampleCv, handlePreview, darkMode }) => {
    return (
        <div className="flex flex-col gap-2 flex-wrap">
            <h3 className={`text-lg md:text-[25px] dark:text-darkColor-text py-2 px-1`}>History of your CVs</h3>
            <div className="flex gap-3 flex-wrap">
                {cv.map((item, index) => (
                    <div key={item.id} className="flex flex-col items-center card-container">
                        <div
                            className="w-[202px] h-[272px] rounded flex items-center justify-center card"
                            style={{ backgroundColor: darkMode ? darkColors[index % darkColors.length] : lightColors[index % lightColors.length] }}
                        >
                            <div
                                onClick={() => handlePreview(item.id)}
                                className="w-[152px] h-[222px] rounded flex items-center justify-center cursor-pointer"
                            >
                                <img src={exampleCv[index % exampleCv.length]} alt="cv" />
                                <div className="view-label bg-blue-500 p-1 rounded text-white">View</div>
                            </div>
                        </div>
                        <h3 className="inline-flex p-1">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CvList;
