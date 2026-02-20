import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function PharmacyManagementSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [sales, setSales] = useState([]);
  const [stock, setStock] = useState([]);
  const [staff, setStaff] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [saleAmount, setSaleAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffSalary, setStaffSalary] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("bKash");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("pharmacyData"));
    if (savedData) {
      setSales(savedData.sales || []);
      setStock(savedData.stock || []);
      setStaff(savedData.staff || []);
      setTransactions(savedData.transactions || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pharmacyData",
      JSON.stringify({ sales, stock, staff, transactions })
    );
  }, [sales, stock, staff, transactions]);

  const totalSales = sales.reduce((a, b) => a + Number(b), 0);
  const totalSalary = staff.reduce((a, b) => a + Number(b.salary), 0);
  const totalTransactions = transactions.reduce((a, b) => a + Number(b.amount), 0);
  const netBalance = totalSales - totalSalary + totalTransactions;

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-96">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-center">Pharmacy Login</h2>
            <Input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full"
              onClick={() => {
                if (password === "1234") {
                  setIsLoggedIn(true);
                } else {
                  alert("Wrong Password");
                }
              }}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Pharmacy Management System
      </motion.h1>

      <Tabs defaultValue="sales">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="sales">Daily Sales</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="Enter Sale Amount"
                value={saleAmount}
                onChange={(e) => setSaleAmount(e.target.value)}
              />
              <Button onClick={() => { setSales([...sales, saleAmount]); setSaleAmount(""); }}>Add Sale</Button>
              <p className="font-semibold">Total Sales: ৳ {totalSales}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
              <Input placeholder="Quantity" value={productQty} onChange={(e) => setProductQty(e.target.value)} />
              <Button onClick={() => { setStock([...stock, { name: productName, qty: productQty }]); setProductName(""); setProductQty(""); }}>Add Stock</Button>
              <ul className="space-y-1">
                {stock.map((item, index) => (
                  <li key={index} className="flex justify-between bg-white p-2 rounded-xl shadow">
                    <span>{item.name}</span>
                    <span>{item.qty}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Input placeholder="Staff Name" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
              <Input placeholder="Salary" value={staffSalary} onChange={(e) => setStaffSalary(e.target.value)} />
              <Button onClick={() => { setStaff([...staff, { name: staffName, salary: staffSalary }]); setStaffName(""); setStaffSalary(""); }}>Add Staff</Button>
              <p className="font-semibold">Total Salary: ৳ {totalSalary}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-4 space-y-3">
              <select className="border p-2 rounded-2xl" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                <option value="bKash">bKash</option>
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
              </select>
              <Input placeholder="Amount" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} />
              <Button onClick={() => { setTransactions([...transactions, { type: transactionType, amount: transactionAmount }]); setTransactionAmount(""); }}>Add Transaction</Button>
              <p className="font-semibold">Total Transactions: ৳ {totalTransactions}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Business Summary</h2>
              <p>Total Sales: ৳ {totalSales}</p>
              <p>Total Salary Expense: ৳ {totalSalary}</p>
              <p>Total Transactions: ৳ {totalTransactions}</p>
              <p className="text-lg font-bold">Net Balance: ৳ {netBalance}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
