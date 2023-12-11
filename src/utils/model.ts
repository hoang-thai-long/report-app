interface label {id:string,name:string}
interface classModel { id: string, name: string, centerID: string, regionID: string, level:string }
interface typeExam {
    siSo: number,
    totalLesson: number,
    classID: string,
    tyleThamGia: number,
    times: number,
    points: number,
    studentIDs: string[] | null,
    details: { name: string, id: string, tyLeThamGia: number, diem: number, thoiGian: number }[]
}
interface typeTuLuyen {
    id: string,
    siso: number,
    hstg: string[] | null,
    tltg: number,
    tgtl: number,
    qtt: number,
    ds: { name: string, id: string, questionTotal: number, timeTotal: number }[]
}

interface ITeacherView { id: string, name: string, classIDs: string[] }

export {
    typeExam,
    typeTuLuyen,
    ITeacherView,
    classModel,
    label
}