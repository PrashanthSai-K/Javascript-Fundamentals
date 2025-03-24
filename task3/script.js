const images = document.querySelectorAll(".images-container img");
const modal = document.querySelector(".image-modal img");

const openImage = (e) => {
    console.log(e.target.src);
    modal.src = e.target.src;
    modal.parentElement.style.opacity = 1;   
    modal.parentElement.style.pointerEvents = "all";  
    document.body.style.overflow = "hidden";
}

const closeImage = () => {    
    modal.parentElement.style.opacity = 0;
    modal.parentElement.style.pointerEvents = "none";
    document.body.style.overflow = "auto";
}

images.forEach(image => image.addEventListener("click", openImage));
