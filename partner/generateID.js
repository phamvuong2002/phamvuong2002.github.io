String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  const hashStr = hash.toString();
  if(hashStr[0] === '-'){
    return hashStr.replace("-","r")
  }
  return hashStr;
}
  
  const str = 'TAX0001 NHA HANG 1'
  console.log(str, str.hashCode())
  const myOjb={
    "matx" : str.hashCode()
  }