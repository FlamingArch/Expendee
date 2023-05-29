import { useState } from "react";
import { Button, Page } from "../components";
import AppBar from "../components/AppBar";
import { IconClose, IconDelete, IconDone, IconEdit } from "../components/Icons";
import Chip from "../components/Chip";
import { Budget } from "../types/budgets";
import { AnimatePresence, motion } from "framer-motion";

export default function PageNewTransaction() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [recurring, setRecurring] = useState(false);
  const [recurringDuration, setRecurringDuration] = useState(0);

  const [category, setCategory] = useState<Budget>();
  const [account, setAccount] = useState<Budget>();

  const [categoryVisible, setCategoryVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);

  const doneDisabled =
    title.length === 0 ||
    amount === null ||
    amount === 0 ||
    (recurring && recurringDuration === 0) ||
    !category ||
    !account;

  const appBar = (
    <AppBar
      sticky
      padding={2}
      leading={<Button Icon={IconDelete} buttonStyle="secondaryAccent" />}
      actions={
        <Button
          disabled={doneDisabled}
          Icon={IconDone}
          label="Done"
          buttonStyle="secondaryAccent"
        />
      }
      heading={
        <input
          style={{
            textAlign: "left",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="clear p-2 text-left"
          placeholder="Title"
        />
      }
    />
  );

  return (
    <Page appBar={appBar} gap={6} className="relative">
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          value={amount ?? ""}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setAmount(null);
            } else if (/^\d+$/.test(e.target.value)) {
              setAmount(parseInt(e.target.value));
            }
          }}
          className="clear p-2 text-6xl font-extralight"
          placeholder="Amount"
        />
      </div>
      <div className="flex justify-center items-center gap-4">
        <input
          type="checkbox"
          checked={recurring}
          className="scale-125"
          onChange={() => setRecurring(!recurring)}
        />
        <p className="font-bold">Recurring Payment</p>
      </div>
      {recurring && (
        <div className="flex justify-center items-center gap-4">
          <p className="font-bold">Recurring Duration: </p>
          <input
            type="number"
            className="w-24"
            value={`${recurringDuration}`}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setRecurringDuration(0);
              } else if (/^\d+$/.test(e.target.value)) {
                setRecurringDuration(parseInt(e.target.value));
              }
            }}
          />
          <p className="font-bold">Days</p>
        </div>
      )}
      <div className="flex justify-center items-center gap-4">
        <Chip
          chipStyle="secondary"
          Icon={IconEdit}
          label="Choose Category"
          onClick={() => setCategoryVisible(true)}
        />
        <Chip
          chipStyle="secondary"
          Icon={IconEdit}
          label="Choose Account"
          onClick={() => setAccountVisible(true)}
        />
      </div>

      <ModalSheet
        visible={categoryVisible}
        title="Choose Category"
        onClose={() => setCategoryVisible(false)}
      >
        Nigga
      </ModalSheet>

      <ModalSheet
        visible={accountVisible}
        title="Choose Account"
        onClose={() => setAccountVisible(false)}
      >
        Nigga
      </ModalSheet>
    </Page>
  );
}

function ModalSheet({
  visible,
  onClose,
  title,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          style={{ opacity: 0, y: -200 }}
          className="grid place-content-center inset-0 p-4 fixed backdrop-blur-sm"
        >
          <div className="rounded-xl p-6 backdrop-blur-xl bg-page dark:bg-page-dark bg-opacity-70 dark:bg-opacity-70 shadow-2xl w-[50vmin] h-[50vmin]">
            <AppBar
              heading={title}
              leading={
                <Button
                  buttonStyle="action"
                  onClick={onClose}
                  Icon={IconClose}
                />
              }
            />
            <div className="flex flex-col p-4">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}