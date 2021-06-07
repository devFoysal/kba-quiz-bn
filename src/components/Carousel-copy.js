import banner from "../assets/images/mnemonic.png";

const Carousel = () => {
  return (
    <section id="carousel-section">
      <div
        id="carouselExampleSlidesOnly"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner ">
          <div class="carousel-item  active">
            <img src={banner} class="d-block w-100" alt="..." />
          </div>
          {/* <div class="carousel-item">
            <img src={banner3} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={banner} class="d-block w-100" alt="..." />
          </div> */}
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
