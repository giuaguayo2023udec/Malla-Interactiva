const ramos = document.querySelectorAll(".ramo");

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

ramos.forEach(ramo => {
  const id = ramo.dataset.id;

  if (aprobados.includes(id)) {
    ramo.classList.add("aprobado");
    ramo.classList.remove("bloqueado");
  }

  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;

    ramo.classList.toggle("aprobado");

    if (ramo.classList.contains("aprobado")) {
      aprobados.push(id);
    } else {
      aprobados = aprobados.filter(r => r !== id);
    }

    localStorage.setItem("aprobados", JSON.stringify(aprobados));
    desbloquearRamos();
  });
});

function desbloquearRamos() {
  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prereq;
    if (prereq && aprobados.includes(prereq)) {
      ramo.classList.remove("bloqueado");
    }
  });
}

desbloquearRamos();
