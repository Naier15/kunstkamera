import './Section.scss'


type Props = {
    nameSection: string
    children: React.ReactNode
}

const Section = ({nameSection, children}: Props) => {

    return (
        <section className={`section ${nameSection}`}>
            { children }
        </section>
    )
}

export default Section