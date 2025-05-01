function ProfPost({img, onClick}) {


    return (
        <>
            <div className="-prof">
                <div className="-prof-content">
                    <img className="-prof-img" src={img} onClick={onClick} alt="" srcset="" />
                </div>
            </div>
        </>
    );
}

export default ProfPost;