document.addEventListener("DOMContentLoaded", function () {
    // Rolagem suave com ajuste para o cabeçalho fixo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();  // Impede o comportamento padrão do link

            // Obtém o id da seção a ser rolada
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Altura do cabeçalho para ajustar a rolagem
                const headerHeight = document.querySelector('header').offsetHeight;

                // Calcula a posição da seção a ser rolada
                const targetPosition = targetElement.offsetTop - headerHeight;

                // Rolagem suave para a posição correta, com ajuste extra
                window.scrollTo({
                    top: targetPosition -1, // Ajuste de -10px para dar uma margem extra
                    behavior: "smooth"
                });
            }
        });
    });

    // Formulário de Contato
    const form = document.getElementById("contact-form");
    const messageDiv = document.getElementById("form-message");

    // Adicionando o ouvinte de evento para o envio do formulário
    form.addEventListener("submit", function (e) {
        e.preventDefault();  // Impede o envio padrão do formulário

        // Criando o objeto FormData com os dados do formulário
        const formData = new FormData(form);

        // Usando o fetch para enviar os dados para o Formspree sem recarregar a página
        fetch(form.action, {
            method: "POST", // Envia os dados no método POST
            body: formData   // Envia os dados do formulário
        })
        .then(response => {
            if (response.ok) {
                // Caso o envio tenha sido bem-sucedido, exibe a mensagem de sucesso
                showMessage("success", "Mensagem enviada com sucesso! Eu responderei em breve.");
                form.reset();  // Limpa o formulário
            } else {
                // Caso haja erro no envio, exibe a mensagem de erro
                showMessage("error", "Houve um erro ao enviar sua mensagem. Tente novamente.");
            }
        })
        .catch(() => {
            // Caso ocorra algum erro durante a requisição, exibe a mensagem de erro
            showMessage("error", "Houve um erro ao enviar sua mensagem. Tente novamente.");
        });
    });

    // Função para exibir mensagens de sucesso ou erro
    function showMessage(type, message) {
        messageDiv.innerHTML = `<p class="${type}">${message}</p>`;  // Define o conteúdo da mensagem
        messageDiv.style.display = "block";  // Exibe a div com a mensagem
    }
});
