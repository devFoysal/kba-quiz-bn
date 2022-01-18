import banner from "../assets/images/mnemonic.png";

const Carousel = () => {
  return (
    <section id="carousel-section">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          <div className="carousel-item  active">
            <img src={banner} className="d-block w-100" alt="..." />
          </div>
          {/* <div className="carousel-item">
            <img src={banner3} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={banner} className="d-block w-100" alt="..." />
          </div> */}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
