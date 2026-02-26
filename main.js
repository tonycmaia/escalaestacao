const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const pes = document.querySelector("#end");
const tipologia = document.querySelector(".tip");

let feriadosCache = {};

async function fetchFeriados(ano) {
  if (feriadosCache[ano]) return feriadosCache[ano];
  try {
    const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
    if (!response.ok) throw new Error("API response not ok");
    const data = await response.json();
    feriadosCache[ano] = data;
    return data;
  } catch (error) {
    console.error("Erro ao buscar feriados:", error);
    return [];
  }
}

async function chamar() {
  const folgas1 = ['Folga', 'Folga', 'Trabalha', 'Trabalha', 'Trabalha', 'Folga', 'Folga', 'Trabalha', 'Trabalha', 'Trabalha', 'Folga', 'Folga', 'Trabalha', 'Trabalha', 'Trabalha', 'Folga', 'Folga', 'Trabalha', 'Trabalha', 'Trabalha', 'Folga', 'Folga', 'Trabalha', 'Trabalha', 'Trabalha', 'Folga', 'Trabalha', 'Trabalha'];
  const folgas2 = ["Trabalha", "Trabalha", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga"];
  const folgas3 = ["Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga"];
  const folgas4 = [" Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha"];
  const folgas5 = ["Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha"];
  const folgasAdv = ["Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Trabalha", "Trabalha"];

  let escalaAtual = [];
  const tip = tipologia.value;

  if (tip === "one") {
    escalaAtual = [...folgas1];
  } else if (tip == "two") {
    escalaAtual = [...folgas2];
  } else if (tip === "three") {
    escalaAtual = [...folgas3];
  } else if (tip === "four") {
    escalaAtual = [...folgas4];
  } else if (tip === "five") {
    escalaAtual = [...folgas5];
  } else if (tip === "Adv") {
    escalaAtual = [...folgasAdv];
  } else {
    escalaAtual = [...folgas1];
  }

  let date = new Date();
  const inputVal = pes.value;
  if (inputVal) {
    date = new Date(inputVal + "T00:00:00");
  }

  const currYear = date.getFullYear();
  const currMonth = date.getMonth();

  const feriados = await fetchFeriados(currYear);
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();

    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const loopDate = new Date(currYear, currMonth, i);
      loopDate.setHours(0, 0, 0, 0);
      const isToday = loopDate.getTime() === today.getTime() ? "active" : "";

      const dateString = loopDate.toISOString().split('T')[0];
      const feriado = feriados.find(f => f.date === dateString);
      const isFeriado = feriado ? "feriado" : "";
      const holidayName = feriado ? feriado.name : "";

      const dateBase = new Date("2024-01-27T00:00:00");
      const diffTime = loopDate.getTime() - dateBase.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const indexEscala = diffDays < 0 ? (28 + (diffDays % 28)) % 28 : diffDays % 28;
      const statusEscala = escalaAtual[indexEscala] || "";

      liTag += `<li class="${statusEscala.trim()} ${isToday} ${isFeriado}" title="${holidayName}" data-date="${dateString}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
  }

  renderCalendar();
}

let timeout = null;
const handleInput = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const dateVal = pes.value;
    // Only call if date is empty (reset) or has a full year (YYYY-MM-DD)
    if (!dateVal || dateVal.length >= 10) {
      chamar();
    }
  }, 500);
};

window.chamar = chamar;
tipologia.addEventListener("change", chamar);
pes.addEventListener("input", handleInput);

chamar();

// --- Modal Logic ---
const modal = document.getElementById('folga-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalDateTitle = document.getElementById('modal-date-title');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const saveAdquirirBtn = document.getElementById('save-adquirir');
const saveUtilizarBtn = document.getElementById('save-utilizar');
const folgasDropdown = document.getElementById('folgas-dropdown');
let selectedDateStr = "";

// State
let folgasState = JSON.parse(localStorage.getItem('saldoFolgas')) || [];

function saveState() {
  localStorage.setItem('saldoFolgas', JSON.stringify(folgasState));
}

// ... Regular Modal ...
function openModal(dateStr) {
  selectedDateStr = dateStr;
  const parts = dateStr.split('-');
  modalDateTitle.innerText = `${parts[2]}/${parts[1]}/${parts[0]}`;

  populateDropdown();

  const radios = document.querySelectorAll('input[name="folga-tipo"]');
  if (radios.length) {
    radios.forEach(radio => radio.checked = false);

    // Check if there is already an acquired Folga for this date
    const existingEntry = folgasState.find(f => f.date === dateStr && f.type !== 'Abono' && f.type !== 'TRE');
    if (existingEntry) {
      const radioToSelect = document.querySelector(`input[name="folga-tipo"][value="${existingEntry.type}"]`);
      if (radioToSelect) radioToSelect.checked = true;
    }
  }

  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  if (modal) modal.classList.add('hidden');
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Tabs
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

// Adquirir
if (saveAdquirirBtn) {
  saveAdquirirBtn.addEventListener('click', () => {
    const selectedType = document.querySelector('input[name="folga-tipo"]:checked');
    if (!selectedType) {
      alert("Selecione um tipo de folga!");
      return;
    }

    // Manage overriding existing entries for this date if changed
    const existingIndex = folgasState.findIndex(f => f.date === selectedDateStr && f.type !== 'Abono' && f.type !== 'TRE');
    if (existingIndex > -1) {
      folgasState[existingIndex].type = selectedType.value;
    } else {
      folgasState.push({
        id: Date.now().toString(),
        date: selectedDateStr,
        type: selectedType.value,
        used: false,
        usedDate: null
      });
    }

    saveState();

    alert(`Folga de '${selectedType.value}' salva com sucesso!`);
    closeModal();
  });
}

// Populate Utilizar Dropdown
function populateDropdown() {
  if (!folgasDropdown) return;
  folgasDropdown.innerHTML = '';
  const rotulos = { 'Feriado': 'Feriado', 'Ponto Facultativo': 'Ponto Fac.', 'Folga': 'Folga' };

  const availableFolgas = folgasState.filter(f => !f.used && f.type !== 'Abono' && f.type !== 'TRE');
  const availableTre = folgasState.filter(f => !f.used && f.type === 'TRE');

  // Abono Logic
  const yearStr = selectedDateStr.split('-')[0];
  const usedAbonosThisYear = folgasState.filter(f => f.type === 'Abono' && f.year === yearStr && f.used);
  const usedAbonoNames = usedAbonosThisYear.map(a => a.name);

  const allAbonos = ['Abono 1', 'Abono 2', 'Abono 3', 'Abono 4', 'Abono 5'];
  const availableAbonos = allAbonos.filter(a => !usedAbonoNames.includes(a));

  if (availableFolgas.length === 0 && availableAbonos.length === 0 && availableTre.length === 0) {
    folgasDropdown.innerHTML = '<option value="">-- Nada disponível para abater --</option>';
    return;
  }

  folgasDropdown.innerHTML = '<option value="">-- Selecione para abater --</option>';

  if (availableAbonos.length > 0) {
    const abonoGroup = document.createElement('optgroup');
    abonoGroup.label = `Abonos de ${yearStr}`;
    availableAbonos.forEach(abono => {
      // Use a distinct prefix for dynamically generated Abono IDs in the dropdown
      const abonoId = `abono-${yearStr}-${abono.replace(' ', '')}`;
      abonoGroup.innerHTML += `<option value="${abonoId}">${abono}</option>`;
    });
    folgasDropdown.appendChild(abonoGroup);
  }

  if (availableTre.length > 0) {
    const treGroup = document.createElement('optgroup');
    treGroup.label = "Folgas TRE";
    availableTre.forEach(tre => {
      treGroup.innerHTML += `<option value="${tre.id}">TRE (Ref. ${tre.year})</option>`;
    });
    folgasDropdown.appendChild(treGroup);
  }

  if (availableFolgas.length > 0) {
    const folgaGroup = document.createElement('optgroup');
    folgaGroup.label = "Folgas Adquiridas";
    availableFolgas.forEach(f => {
      const parts = f.date.split('-');
      const ptDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      folgaGroup.innerHTML += `<option value="${f.id}">${rotulos[f.type] || f.type} - (Dia ${ptDate})</option>`;
    });
    folgasDropdown.appendChild(folgaGroup);
  }
}

// Utilizar
if (saveUtilizarBtn) {
  saveUtilizarBtn.addEventListener('click', () => {
    const selectedId = folgasDropdown.value;
    if (!selectedId) {
      alert("Selecione uma folga, abono ou TRE para abater!");
      return;
    }

    // Check if it's an Abono
    if (selectedId.startsWith('abono-')) {
      const parts = selectedId.split('-');
      const yearStr = parts[1];
      const abonoNameStr = parts[2] === 'Abono1' ? 'Abono 1' :
        parts[2] === 'Abono2' ? 'Abono 2' :
          parts[2] === 'Abono3' ? 'Abono 3' :
            parts[2] === 'Abono4' ? 'Abono 4' : 'Abono 5';

      // Push directly as used
      folgasState.push({
        id: Date.now().toString(),
        type: 'Abono',
        name: abonoNameStr,
        year: yearStr,
        used: true,
        usedDate: selectedDateStr
      });
      saveState();
      alert(`'${abonoNameStr}' abatido com sucesso!`);
      closeModal();
      return;
    }

    // Standard Folga or TRE
    const folgaIndex = folgasState.findIndex(f => f.id === selectedId);
    if (folgaIndex > -1) {
      folgasState[folgaIndex].used = true;
      folgasState[folgaIndex].usedDate = selectedDateStr;
      saveState();
      alert(`'${folgasState[folgaIndex].type}' abatida com sucesso!`);
      closeModal();
    }
  });
}

// Add click listener to days parent
if (daysTag) {
  daysTag.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li && !li.classList.contains('inactive') && li.dataset.date) {
      openModal(li.dataset.date);
    }
  });
}