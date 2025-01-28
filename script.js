     let contadorAmostras = 1;

        function adicionarAmostra() {
            contadorAmostras++;
            const amostrasDiv = document.getElementById('amostras');

            const novaAmostra = document.createElement('div');
            novaAmostra.classList.add('amostra');
            novaAmostra.innerHTML = `
              <h3 class="igual">Amostra ${contadorAmostras}</h3>
                <label>Valor do Imóvel:</label>
               <div class="input-container">
            <input type="text" id="input" class="valorImovel" required="" oninput="formatarNumeroBR(this)">
<label for="input" class="label">Valor do imóvel</label>
<div class="underline"></div>
</div>
                <label>Área (m²):</label>
                <div class="input-container">
            <input type="text" id="input" class="areaImovel" required="" oninput="formatarNumeroBR(this)">
<label for="input" class="label">Área do imóvel</label>
<div class="underline"></div>
</div>
            `;

            amostrasDiv.appendChild(novaAmostra);
        }

        function formatarNumeroBR(input) {
            let valor = input.value;

            // Remove qualquer caractere que não seja número
            valor = valor.replace(/[^\d]/g, "");

            // Adiciona os separadores de milhar e decimal
            valor = parseFloat(valor / 100).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            input.value = valor;
        }

        function calcularPrecoEIrParaTopo() {
            const valores = document.querySelectorAll('.valorImovel');
            const areas = document.querySelectorAll('.areaImovel');
        
            let somaPrecosM2 = 0;
            let totalAmostras = 0;
        
            for (let i = 0; i < valores.length; i++) {
                let valor = valores[i].value.replace(/\./g, '').replace(',', '.'); // Remove pontos e ajusta vírgulas
                let area = areas[i].value.replace(/\./g, '').replace(',', '.');   // Remove pontos e ajusta vírgulas
        
                valor = parseFloat(valor);
                area = parseFloat(area);
        
                // Validar se os valores são números positivos
                if (!isNaN(valor) && valor > 0 && !isNaN(area) && area > 0) {
                    const precoM2 = valor / area; // Calcula o preço por m²
                    somaPrecosM2 += precoM2;     // Soma o preço por m²
                    totalAmostras++;             // Contador de amostras válidas
                }
            }
        
            const resultadoDiv = document.getElementById('resultado');
        
            if (totalAmostras > 0) {
                const mediaPrecoM2 = somaPrecosM2 / totalAmostras; // Média do preço por m²
                const precoVendaM2 = mediaPrecoM2 * 0.85;          // Aplicar desconto de 15%
        
                resultadoDiv.innerHTML = `
                    <h2 class="igual" >Resultado</h2>
                    <br>
                    <p class="resposta">Preço do m² da região: R$ ${mediaPrecoM2.toFixed(2)}</p>
                    <br>
                    <p class="resposta">Preço do m² para Venda: R$ ${precoVendaM2.toFixed(2)}</p>
                `;
                resultadoDiv.style.display = 'block'; // Exibe o resultado
            } else {
                resultadoDiv.innerHTML = `
                    <h2 class="igual">Resultado</h2>
                    <br>
                    <p class="resposta">Por favor, insira dados válidos nas amostras (valores maiores que 0).</p>
                `;
                resultadoDiv.style.display = 'block'; // Exibe o resultado mesmo para aviso
            }
        
            // Chama a função para rolar a página para o topo
            window.scrollTo({
                top: 100,
                behavior: 'smooth'  // Rolagem suave
            });
        }
        



        const toggleThemeButton = document.getElementById('toggleTheme');
let isDarkMode = false;

// Alterna entre os temas
toggleThemeButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleThemeButton.innerHTML = '🌙 Modo Escuro';
  } else {
    document.documentElement.removeAttribute('data-theme');
    toggleThemeButton.innerHTML = '🌞 Modo Claro';
  }
});
