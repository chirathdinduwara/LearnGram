<<<<<<< HEAD
function ProfPost({ img }) {
  return (
    <>
      <div className="-prof">
        <div className="-prof-content">
          <img className="-prof-img" src={img} alt="" srcset="" />
        </div>
      </div>
    </>
  );
=======
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
>>>>>>> main
}

export default ProfPost;
