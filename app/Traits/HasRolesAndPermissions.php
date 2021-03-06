<?php
namespace App\Traits;

use App\Models\Role;
use App\Models\Permission;

trait HasRolesAndPermissions
{
    /**
     * @return mixed
     * Связь модели User с моделью Role, позволяет получить все роли пользователя
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class,'users_roles');
    }

    /**
     * @return mixed
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class,'users_permissions');
    }

    /**
     * @param mixed ...$roles
     * @return bool
     * есть ли у текущего залогиненного!!! Пользователя Роль
     */
    public function hasRole(... $roles ) {
        foreach ($roles as $role) {
            if ($this->roles->contains('slug', $role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param $permission
     * @return bool
     * Для проверки прав доступа текущего пользователя
     * Сначала определяем есть ли права у пользователя
     */
    public function hasPermission($permission)
    {
        return (bool) $this->permissions->where('slug', $permission)->count();
    }

    /**
     * @param $permission
     * @return bool
     * есть ли у Пользователя Права напрямую или через Роль
     *  если есть права или роль правами то возвращаем true
     */

    public function hasPermissionTo($permission)
    {
        return $this->hasPermissionThroughRole($permission) || $this->hasPermission($permission->slug);
    }

    /**
     * @param $permission
     * @return bool
     * проверяет, есть ли у Пользователя Права через его Роль.
     */
    public function hasPermissionThroughRole($permission)
    {
        foreach ($permission->roles as $role){
            if($this->roles->contains($role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param array $permissions
     * @return mixed
     * прикрепляем права  к текущему Пользователю.
     * 1. получаем все права
     */
    public function getAllPermissions(array $permissions)
    {
        return Permission::whereIn('slug',$permissions)->get();
    }

    /**
     * @param mixed ...$permissions
     * @return $this
     * передаем Права в виде массива и получаем все Права из базы данных на основе массива.
     */
    public function givePermissionsTo(... $permissions)
    {
        $permissions = $this->getAllPermissions($permissions);
        if($permissions === null) {
            return $this;
        }
        $this->permissions()->saveMany($permissions);
        return $this;
    }

    /**
     * @param mixed ...$permissions
     * @return $this
     * Чтобы удалить Права Пользователя, мы передаем Права методу deletePermissions()
     * и удаляем все прикрепленные Права с помощью метода detach()
     */
    public function deletePermissions(... $permissions )
    {
        $permissions = $this->getAllPermissions($permissions);
        $this->permissions()->detach($permissions);
        return $this;
    }

    /**
     * @param mixed ...$permissions
     * @return HasRolesAndPermissions
     * удаляем права и переназначаем новые
     */
    public function refreshPermissions(... $permissions )
    {
        $this->permissions()->detach();
        return $this->givePermissionsTo($permissions);
    }


}
