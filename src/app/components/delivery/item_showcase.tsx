export interface Item {
    img: string;
    imgAlt: string;
    description: string[];
}

export default function ItemShowcase({ img, imgAlt, description }: Item) {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={img} alt={imgAlt} />
            <ul className="list-disc">
                {description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                ))}
            </ul>
        </div>
    );
}
