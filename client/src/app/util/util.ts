export function getCookie(key: string){
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function removeCookie(key: string){
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function currencyFormat(amount: number){
    return '$' + (amount/100).toFixed(2);
}