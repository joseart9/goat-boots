"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Ventas",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Productos Vendidos",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Clientes Activos",
    value: "1,234",
    change: "-2.5%",
    trend: "down",
    icon: Users,
  },
  {
    title: "Pedidos Pendientes",
    value: "45",
    change: "+5.2%",
    trend: "up",
    icon: ShoppingCart,
  },
];

const recentOrders = [
  {
    id: "1",
    customer: "Juan Pérez",
    product: "Botas de Cuero",
    amount: "$299.99",
    status: "Completado",
  },
  {
    id: "2",
    customer: "María García",
    product: "Zapatillas Deportivas",
    amount: "$149.99",
    status: "En Proceso",
  },
  {
    id: "3",
    customer: "Carlos López",
    product: "Sandalias",
    amount: "$79.99",
    status: "Pendiente",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary-100/25 dark:bg-secondary-500/25 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de control
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-secondary-500 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary-500" />
              </div>
              <span
                className={`flex items-center text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-secondary-500 rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Ventas Recientes
          </h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-600 rounded-lg"
              >
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {order.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.product}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-black dark:text-white">
                    {order.amount}
                  </p>
                  <p
                    className={`text-sm ${
                      order.status === "Completado"
                        ? "text-green-500"
                        : order.status === "En Proceso"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-secondary-500 rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Tendencias
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-600 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium text-black dark:text-white">
                    Botas de Cuero
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Producto más vendido
                  </p>
                </div>
              </div>
              <span className="text-green-500">+45%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-600 rounded-lg">
              <div className="flex items-center">
                <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
                <div>
                  <p className="font-medium text-black dark:text-white">
                    Sandalias
                  </p>
                  <p className="text-sm text-muted-foreground">Menos vendido</p>
                </div>
              </div>
              <span className="text-red-500">-12%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
