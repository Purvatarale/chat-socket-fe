import moment from "moment";
import Badge from '../badge'
export default function ChatContact({ contact, categories }) {
  const { image, name, lastMessage, updatedAt, description } = contact;
  const category = categories.find(
    (category) => category.id === contact.category
  );
  return (
    <div className="flex flex-row gap-2 items-center py-1 px-2 hover:bg-[#00000110] transition-all cursor-pointer rounded">
      <img
        src={category?.icon}
        alt={category?.title}
        className="rounded-full aspect-square w-[50px]"
      />
      <div className="flex flex-row justify-between items-center w-full">
        <div className="basis-[60%] max-w-[60%]">
          
          <h3 className="text-[1.1rem]">
            {description
              ? description.length > 20
                ? description.slice(0, 20) + "..."
                : description
              : ""}
          </h3>
          <h3 className="text-[0.9rem]">{category?.title}</h3>
        </div>
        <div className="basis-[40%] text-[0.6rem] text-gray-700 flex flex-col items-end justify-end gap-1">
          <Badge status={contact.status} />
          {moment(updatedAt).fromNow()}
        </div>
      </div>
    </div>
  );
}
