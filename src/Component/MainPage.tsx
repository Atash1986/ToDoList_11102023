import React, { useState, useEffect, MouseEvent } from "react";
import ToDoItem from "./ToDoItem";
import "./MainPage.css";
import taskItems from "../data/taskItems";
import { authorsItems } from "../data/authorsItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import * as MyPlus from "../assest/image/plus.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import AddBox from "./AddBox";
import ToDoList from "./ToDoList";
import categories from "../data/categories";
import { initTask } from "../data/initTask";
import { ToggleButton } from "./ToggleButton";
import NoDataImage from "../assest/image/no-data.png";
import axios from "axios";
import LoadingSpinnerComponent from "react-spinners-components";

function MainPage({ activeCategoryId }: { activeCategoryId: number }) {
  const [currentItem, setCurrentItem] = useState<TaskItem>(initTask);
  const [items, setItems] = useState<TaskItem[]>(taskItems);
  const [lastItemId, setLastItemId] = useState<number>(-1);
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTasks = async () => {
    setIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
    const result = await axios.get(baseUrl + "tasks");
    setIsLoading(false);
    return result.data;
  };

  useEffect(() => {
    (async () => {
      const fetchedItems = await getTasks();
      setItems(fetchedItems.data);
    })();
  }, []);

  // useEffect(() => {
  //   if (taskItems.length > 0) {
  //     // Get the maximum id from taskItems
  //     const maxId = Math.max(...taskItems.map((item) => item.id));
  //     setLastItemId(maxId + 1);
  //   }
  // }, [taskItems]);

  const isAllCategory = activeCategoryId === 0;
  const activeItems: TaskItem[] = items.filter(
    (item: TaskItem) =>
      !item?.isDone &&
      (item.categoryItem.id === activeCategoryId || isAllCategory)
  );

  const doneItems: TaskItem[] = items.filter(
    (item: TaskItem) =>
      item?.isDone &&
      (item.categoryItem.id === activeCategoryId || isAllCategory)
  );

  return (
    <div className="contentTasks">
      <div className="statisticsBox">
        <div className="statisticsDetail">
          <span className="number">{activeItems.length}</span>
          <span className="name">Active Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{doneItems.length}</span>
          <span className="name">Done Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{categories.length}</span>
          <span className="name">Categories</span>
        </div>
      </div>
      <AddBox
        activeCategoryId={activeCategoryId}
        itemId={lastItemId}
        setItems={setItems}
        setItemId={setLastItemId}
        items={items}
      />
      <div>
        {isLoading === true ? (
          <LoadingSpinnerComponent
            type={"Blocks"}
            colors={["#06628d", "#f91a10"]}
            size={"100px"}
          />
        ) : activeItems.length === 0 ? (
          <img className="noDataImage" src={NoDataImage} />
        ) : (
          <ToDoList items={activeItems} setItems={setItems} />
        )}

        <ToggleButton
          isDivVisible={isDivVisible}
          setDivVisible={setDivVisible}
        />

        {isDivVisible && (
          <div className="taskDoneItem">
            <ToDoList items={doneItems} setItems={setItems} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
