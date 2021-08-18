<?php

  namespace App\Models;

  use App\Traits\HasRolesAndPermissions;
  use Illuminate\Contracts\Auth\MustVerifyEmail;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Foundation\Auth\User as Authenticatable;
  use Illuminate\Notifications\Notifiable;
  use Tymon\JWTAuth\Contracts\JWTSubject;

  class User extends Authenticatable implements JWTSubject
  {
    use HasFactory, Notifiable, HasRolesAndPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'id',
      'name',
      'login',
      'email',
      'password',
      'img',
      'facebook',
      'site',
      'phone',
      'viber',
      'telegram',
      'whatsapp',
      'skype',
      'balance'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
      'password',
      'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
      'email_verified_at' => 'datetime',
    ];

    public function roles()
    {
      return $this->belongsToMany(Role::class, 'users_roles');
    }
    // возвращаем ключ
    public function getJWTIdentifier()
    {
      return $this->getKey();
    }
    // возвращаем массов с пользовательскими данными
    public function getJWTCustomClaims()
    {
      return [];
    }

    public function social()
    {
      return $this->hasMany(UserSocial::class, 'user_id', 'id');
    }

    public function hasSocialLinked($service)
    {
      return (bool) $this->social->where('service', $service)->count();
    }

  }
