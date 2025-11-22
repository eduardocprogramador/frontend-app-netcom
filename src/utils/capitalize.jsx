export function capitalize(nome) {
    if (!nome) return ""
    const excecoes = ["das", "dos"]
    return nome
        .split(" ")
        .map(palavra => {
            const lower = palavra.toLowerCase();
            if (excecoes.includes(lower)) {
                return lower;
            }
            if (palavra.length <= 2) {
                return lower;
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(" ");
}
