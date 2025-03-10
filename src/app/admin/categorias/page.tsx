import { createClient } from "@/utils/supabase/client"
// import { form } from "@/react-hook-formm";

export default function CategoriasPage() {
    const db = createClient()
    return (
        <div>
            Categorias
        </div>
    )
}