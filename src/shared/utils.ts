export function validateEmail(email: string): boolean {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}

export function roundDecimals(rawNumber: number|string, decimal?: number): number | null {
  if(rawNumber){
    if (typeof rawNumber == 'string') {
      rawNumber = Number(rawNumber)
    }
    let _decimal = 100
    if(decimal && decimal > 0) { _decimal = 10**decimal }
    const decimalRounded = (Math.round((rawNumber + Number.EPSILON) * _decimal) / _decimal)
    return decimalRounded
  }else{
    return null
  }
}

export function cloneObjRemovingRef(obj: any): any {
  if(obj){
    try{
      return JSON.parse(JSON.stringify(obj))
    }catch(e){
      throw new Error('Error trying to remove reference from a Obj')
    }
  }else{
    return null
  }
}
