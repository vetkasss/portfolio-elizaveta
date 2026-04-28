const sidebar = document.getElementById("sidebar");
document.getElementById("menuBtn").onclick =
  () => sidebar.classList.toggle("open");


const title = document.querySelector(".title");
let ticking = false;

document.addEventListener("mousemove",(e)=>{
  if(ticking) return;
  ticking = true;

  requestAnimationFrame(()=>{
    const x = (e.clientX/window.innerWidth - .5) * 12;
    const y = (e.clientY/window.innerHeight - .5) * 12;
    title.style.transform = `translate(${x}px,${y}px)`;
    ticking = false;
  });
});


const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

function openModal(src){
  modal.classList.add("show");

  const img = new Image();
  img.src = src;

  img.decode().then(()=>{
    modalImg.src = src;
  });
}

document.getElementById("close").onclick =
  ()=> modal.classList.remove("show");

modal.onclick = e=>{
  if(e.target === modal) modal.classList.remove("show");
};

// GALLERY
const gallery = document.getElementById("gallery");

// список сертификатов
const certs = Array.from({length:29},(_,i)=>({
  preview:`../certificates/previews/cert${i+1}.webp`,
  full:`../certificates/cert${i+1}.webp`
}));

// для ленивой загрузки
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});


const fragment = document.createDocumentFragment();

certs.forEach(c=>{
  const div = document.createElement("div");
  div.className = "item";

  const img = document.createElement("img");
  img.dataset.src = c.preview;
  img.loading = "lazy";

  observer.observe(img);

  div.onclick = ()=>openModal(c.full);

  div.appendChild(img);
  fragment.appendChild(div);
});

gallery.appendChild(fragment);
