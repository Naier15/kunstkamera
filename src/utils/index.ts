/**
 * Функция для блокирования события onContextMenu. Используется для запрета
 *  копирования картинок проекта
 * @param {*} event объект события
 */
export function disableContextMenu(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.preventDefault()
}


/**
 * Функция для присвоения нового класса элементам TargetList и TargetBlock
 * при наведении мыши на выбранный айтем
 * @param {null | number} hoverIndex id выбранного айтема
 * @returns {string} имя класса выбранного айтема
 */
export const addClassNamesByIndex = (hoverIndex: number | null) => {

    switch (hoverIndex) {
        case 0:
            return 'anatomicalTheater-hover'
        case 1:
            return 'library1rdFloor-hover'
        case 2:
            return 'library2rdFloor-hover'
        case 3:
            return 'library3rdFloor-hover'
        case 4:
            return 'münzkabinet-hover'
        case 5:
            return 'cabinetOfPeter1-hover'
        case 6:
            return 'naturalia1ndFloor-hover'
        case 7:
            return 'naturalia2ndFloor-hover'
        case 8:
            return 'gallery-hover'
        case 9:
            return 'gottorpGlobe-hover'
        case 10:
            return 'artifialia3rdFloor-hover'
        default:
            return ''
    }
}