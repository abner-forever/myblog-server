/**
 * 
 * @param {base64} base
 * @returns string
 */
const base64toStr = (base)=>{
  const buff = Buffer.from(base, 'base64');
  return buff.toString('utf-8');
}

/**
 * 
 * @param {base64} content
 * @returns string
 */
const strtoBase64 = (content)=>{
  const  buff = Buffer.from(content, 'utf-8');
  return buff.toString('base64');
}

module.exports = {
  base64toStr,
  strtoBase64
}