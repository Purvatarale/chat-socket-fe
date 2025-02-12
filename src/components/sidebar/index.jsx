import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import { Button } from "../../modules/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../modules/ui/dialog";
import { Input } from "../../modules/ui/input";
import ChatContact from "../chat-contact";
import request from "../../utils/request";
import { useUser } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../utils/use-device";
import { cn } from "../../utils";

const Sidebar = ({ chatCategories }) => {
  const [search, setSearch] = React.useState("");
  const [searchedContacts, setSearchedContacts] = React.useState([]);
  const [contactsData, setContactsData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const user = useUser();
  const router = useNavigate();

  // Fetching chats data without React Query
  React.useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await request.get(`/conversations/get-chats/${user.email}`);
        setContactsData(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchChats();
    }
  }, [user]);

  React.useEffect(() => {
    if (search) {
      const category = chatCategories.find(
        (cat) => {
          return cat.title.toLowerCase().includes(search.toLowerCase());
        }
      );

      setSearchedContacts(
        contactsData
          ? contactsData.filter(
              (c) =>
                c.category == category?.id ||
                (c.name?.toLowerCase().includes(search.toLowerCase())) ||
                (c.email?.toLowerCase().includes(search.toLowerCase())) ||
                (c.description?.toLowerCase().includes(search.toLowerCase()))
            )
          : []
      );

    } else {
      setSearchedContacts(
        contactsData
          ? contactsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : []
      );
    }
  }, [search, contactsData, chatCategories]);

  const [categoryDescription, setCategoryDescription] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const isPhone = useIsMobile();
  const handleCategoryClick = async (category) => {
    if (!categoryDescription.trim()) {
      alert("Please enter a description for your chat");
      return;
    }

    if (categoryDescription.length > 20 || categoryDescription.length < 5) {
      alert("Description should be between 5 and 50 characters");
      return;
    }

    const { data } = await request.post(`/conversations/create-chat`, {
      category: category.id,
      email: user.email,
      name: user.name,
      description: categoryDescription,
    });

    setCategoryDescription("");
    setOpenModal(false);
    if (data._id) {
      router(`/${data._id}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-2 rounded pb-[3vh] relative h-full">
      {contactsData?.length > 0 && (
        <Input
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      )}
      {searchedContacts?.length > 0 &&
        searchedContacts.map((contact) => {
          return (
            <Link to={`/${contact._id}`} key={contact.id}>
              <ChatContact contact={contact} categories={chatCategories} />
            </Link>
          );
        })}

      {!searchedContacts?.length && (
        <>
          <div className="mt-[5vh] text-center p-5 h-[]">
            Please start your first conversation
          </div>
          <img
            src={arrow}
            className={cn(`rotate-[75deg] opacity-[0.2] absolute bottom-[25vh] `)}
          />
        </>
      )}

      {chatCategories.length > 0 && (
        <Dialog open={openModal} onOpenChange={(e) => setOpenModal(e)}>
          <DialogTrigger asChild>
            <Button className={`bg-blue-300 hover:bg-blue-200 rounded-full aspect-square fixed w-[50px] h-[50px]  bottom-5`}
            style={{
              left: isPhone ? "76vw" : "24vw",
            }}
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px]"
            style={{ maxWidth: "600px", maxHeight: "75vh", overflowY: "auto" }}
            selectedCategory={selectedCategory}  // Pass selectedCategory as prop
        setSelectedCategory={setSelectedCategory}  // Pass setSelectedCategory as prop
          >
            <DialogHeader>
              <DialogTitle>Start a new Chat</DialogTitle>
              <DialogDescription>Select a category to start.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 p-2">
              
              <div className="transition-all" style={{ display: "grid", gridTemplateColumns: isPhone || selectedCategory ?"repeat(1, 1fr)": "repeat(2,1fr)", gap: "16px" }}>
                {!selectedCategory && chatCategories.map((category) => {
                  return (
                    <div
                      className="flex flex-row items-center p-2 gap-2 rounded bg-[#00000110] hover:bg-[#00000120] cursor-pointer"
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00000120")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00000110")}
                    >
                      <img src={category.icon} className="w-10 h-10" />
                      <div className="flex flex-col">
                        <p className="font-bold">{category.title}</p>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                    </div>
                  );
                })}
                {selectedCategory && 
                <div className="flex flex-col gap-2">
                
                <div
                      className="flex flex-row items-center p-2 gap-2 rounded bg-[#00000110] hover:bg-[#00000120] cursor-pointer scale-in-ver-bottom"
                      key={selectedCategory.id}
                      onClick={() => {
                        setSelectedCategory(null);
                        // handleCategoryClick(category);
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00000120")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00000110")}
                    >
                      <img src={selectedCategory.icon} className="w-10 h-10" />
                      <div className="flex flex-col">
                        <p className="font-bold">{selectedCategory.title}</p>
                        <p className="text-sm text-gray-500">{selectedCategory.description}</p>
                      </div>
                    </div> 
                    <div className="fade-in-top mt-5">
                <Input
                  onChange={(e) => {
                    setCategoryDescription(e.target.value);
                  }}
                  placeholder="Please briefly describe your issue in 5 to 50 characters"
                  value={categoryDescription}
                />
              </div>
              <Button disabled={!selectedCategory || !categoryDescription.trim()}
                onClick={() => {
                  handleCategoryClick(selectedCategory);
                }}
              >
                Create Chat
              </Button>
                </div>
                    }
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Sidebar;