import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { menuService } from '../service/menu_service'
import FormResep from '../components/FormResep'
import UploadImageModal from '../components/UploadImageModal'
import Loading from '../components/Loading'

const DashboardPage = () => {
  const [menus, setMenus] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null)
  const [selectedMenu, setSelectedMenu] = useState<any>(null)

  const fetchMenus = async () => {
    try{
      setLoading(true)
      const response = await menuService.getAll({
      page: currentPage,
      limit: 5,
    })
    setMenus(response.data.menus || [])
    setTotalPage(response.data.totalPages)
    }
    catch{
      toast.error('Gagal load resep')
    }finally{
      setLoading(false)
    }
  }

  const handleDeleteResep = async (id: number) => {
    try {
      const confirmDelete = confirm('Yakin menghapus resep ini?')
      if (!confirmDelete) return
      await menuService.delete(id)
      toast.success('Menu berhasil dihapus')
      fetchMenus()
    } catch (error) {
      toast.error('Gagal menghapus menu')
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        ingredients: data.ingredients.map((item: string) => ({
          description: item,
        })),
        recipes: data.instructions.map(
          (item: string, index: number) => ({
            sort_number: index + 1,
            description: item,
          })
        ),
        nutritions: {
          calory: 10,
          protein: 50,
          carbohydrate: 90,
          fat: 40,
        },
      }
      if(selectedMenu){
        await menuService.update(selectedMenu.id,payload)
        toast.success('Resep berhasil diupdate')
      }else{
        await menuService.create(payload)
        toast.success('Resep berhasil ditambahkan')
      } 
      setShowForm(false)
      fetchMenus()
    } catch (error) {
      toast.error('Terjadi Kesalahan')
    }
  }
  

  const handleOpenUploadModal = (menuId: number) => {
    setSelectedMenuId(menuId)
    setUploadModalOpen(true)
  }

  const handleUploadImage = async (file: File) => {
    if (!selectedMenuId) return
    try {
      setLoadingUpload(true)
      await menuService.uploadImage(selectedMenuId, file)
      toast.success('Gambar berhasil diupload')
      fetchMenus()
      setUploadModalOpen(false)
    } catch (error:any) {
      const errorMessage =
        error?.response?.data?.data?.image?.msg ||
        error?.response?.data?.message ||
        'Gagal upload gambar'
        toast.error(errorMessage)
        
    }finally{
      setUploadModalOpen(false)
      setLoadingUpload(false)
    }
  }
  useEffect(() => {
    fetchMenus()
  }, [currentPage])

  return ( 
    <div className="container-custom py-10">
      <div className="flex flex-col items-start justify-between mb-8 gap-10">
        <h1 className="text-4xl font-bold">
          {showForm ? 'Buat Resep Baru' : 'Kelola Resep'}
        </h1>
        {!showForm && (
          <button 
            onClick={() => {setShowForm(true); setSelectedMenu(null)}} 
            className="bg-[#E8B431] px-5 py-3 rounded-xl text-white font-semibold hover:bg-[#d4a229] transition-colors"
          >
            Tambah Resep
          </button>
        )}
      </div>
      {showForm ? (
        <div>
          <FormResep
            dataEdit={selectedMenu}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <>
        <div className="overflow-auto">
          {loading ? <Loading/> :
          <table className="w-full min-w-225">
            <thead className="bg-none">
              <tr>
                <th className="p-2 text-left font-medium">Nama Resep</th>
                <th className="p-2 text-left font-medium">Kategori</th>
                <th className="p-2 text-left font-medium">File ID</th>
                <th className="p-2 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu: any) => (
                <tr key={menu.id} className="border-t">
                  <td className="p-2 font-semibold">{menu.name}</td>
                  <td className="p-2 font-semibold">
                    {menu.category?.name}
                  </td>
                  <td className="p-2 font-semibold">
                    {menu.file_id?.slice(0,14) || '-'}
                  </td>
                  <td className="p-2 flex ">
                    <button
                      onClick={() => handleDeleteResep(menu.id)}
                      className="text-red-500   font-bold hover:text-red-600"
                    >
                      Del
                    </button>
                    <button onClick={() =>{ setShowForm(true); setSelectedMenu(menu)}} className="text-blue-500 px-2   py-2 font-bold hover:text-blue-600">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleOpenUploadModal(menu.id)}
                      className="text-[#14B8A6]  py-2 font-bold hover:text-[#0d9488]"
                    >
                      Gambar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={` transition
              ${
                currentPage <= 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              }`}
          >
            &lt;&lt;
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-black font-semibold">
              {currentPage}
            </div>
            <span className="text-black font-semibold">of</span>
            <div className="w-10 h-10 flex items-center justify-center text-black font-semibold">
              {totalPage}
            </div>
          </div>
          <button
            disabled={currentPage >= totalPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`transition
              ${
                currentPage >= totalPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100'
              }`}
          >
            &gt;&gt;
          </button>
        </div>
        </>
      )}
      <UploadImageModal
        isOpen={uploadModalOpen}
        loadingUpload={loadingUpload}
        onClose={() => {
          setUploadModalOpen(false)
          setSelectedMenuId(null)
        }}
        onUpload={handleUploadImage}
      />
    </div>
  )
}

export default DashboardPage
