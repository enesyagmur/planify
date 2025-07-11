"use client";
import NewTemplateModal from "../../components/tasksComponents/NewTemplateModal";
import React, { useState } from "react";
import { LayoutList } from "lucide-react";
import { BadgePlus } from "lucide-react";
import SelectTaskModal from "../../components/tasksComponents/SelectTaskModal";
import { useSelector } from "react-redux";
import TaskTemplates from "../../components/tasksComponents/TaskTemplates";
import TodayTasks from "../../components/tasksComponents/TodayTasks";

const Tasks = () => {
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [selectTaskModal, setSelectTaskModal] = useState(false);
  const [taskTemplatesShow, setTaskTemplatesShow] = useState(false);

  const { user, loading } = useSelector((state) => state.authState);

  return (
    <div className="w-11/12  mx-auto px-2 py-8">
      {/* Başlık ve Yeni Görev Butonu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1
          className={`text-2xl md:text-4xl cursor-pointer font-bold hover:text-white ${
            taskTemplatesShow ? "text-neutral-600" : "text-white"
          }  `}
          onClick={() => setTaskTemplatesShow(false)}
        >
          Görevlerim
        </h1>

        <div className="w-6/12 h-full flex items-center justify-end">
          <button
            onClick={() => setTaskTemplatesShow(true)}
            className={`flex items-center gap-2 px-4 py-2 mr-2 rounded-lg border-2 border-purple-950 hover:bg-purple-700 ${
              taskTemplatesShow && "bg-purple-600 text-white"
            }   font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <span className="text-lg">
              <LayoutList />
            </span>
            <span>Görev Seç</span>
          </button>
          <button
            onClick={() => setShowNewTemplateModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-purple-950 hover:bg-purple-700  text-white font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <span className="text-lg">
              <BadgePlus />
            </span>
            <span>Görev Oluştur</span>
          </button>
        </div>
      </div>

      {/* Task Templates*/}
      {user?.uid && taskTemplatesShow && <TaskTemplates userId={user.uid} />}

      {/* Task History*/}
      {user?.uid && !taskTemplatesShow && <TodayTasks userId={user.uid} />}

      {/* Yeni Görev Modalı */}
      {showNewTemplateModal && (
        <NewTemplateModal
          onClose={() => setShowNewTemplateModal(false)}
          userId={user.uid}
        />
      )}

      {selectTaskModal && (
        <SelectTaskModal
          onClose={() => setSelectTaskModal(false)}
          userId={user.uid}
        />
      )}

      {/* Modal arka planına tıklayınca kapatma */}
      {showNewTemplateModal ||
        (selectTaskModal && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowNewTaskModal(false);
              setSelectTaskModal(false);
            }}
            aria-label="Modalı Kapat"
          />
        ))}
    </div>
  );
};

export default Tasks;
